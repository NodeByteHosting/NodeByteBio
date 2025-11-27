"use client";

import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import createGlobe from "cobe";

export function CobeGlobe(props: ComponentPropsWithoutRef<"canvas">) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current == null) return;
        let phi = 0;

        // Basic feature-detect: ensure the browser can create a WebGL context
        const canGetContext = () => {
            try {
                const c = canvasRef.current;
                if (!c || typeof c.getContext !== "function") return false;
                // Try common WebGL context names
                const ctx: any = c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl");
                if (!ctx) return false;
                // On some iOS beta builds the context object exists but `getContextAttributes()` may return null.
                // Ensure getContextAttributes is callable and returns a non-null object with expected fields.
                if (typeof ctx.getContextAttributes !== "function") return false;
                const attrs = ctx.getContextAttributes();
                if (!attrs) return false;
                // `alpha` is the attribute our downstream code expects; ensure it's present (may be boolean)
                if (typeof attrs.alpha === "undefined") return false;
                return true;
            } catch (err) {
                return false;
            }
        };

        if (!canGetContext()) {
            // WebGL not available (private mode, disabled, or unsupported). Skip creating the globe.
            // This prevents errors like "null is not an object (evaluating 'l.getContextAttributes().alpha')"
            return;
        }

        let globe: { destroy?: () => void } | null = null;
        try {
            globe = createGlobe(canvasRef.current, {
                devicePixelRatio: 2,
                width: 600 * 2,
                height: 550 * 2,
                phi: 0,
                theta: 0,
                dark: 1,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                baseColor: [0.2588, 0.8275, 0.5725],
                markerColor: [1.0, 1.0, 1.0],
                glowColor: [0.2588, 0.8275, 0.5725],
                markers: [
                    // locations are [latitude, longitude]
                    { location: [55.3781, -3.4360], size: 0.07 }
                ],
                onRender: (state) => {
                    state.phi = phi;
                    phi += 0.01;
                }
            });
        } catch (err) {
            // If the library throws (e.g., context creation race or unexpected failure), log and skip the globe
            // Keep the site functional instead of crashing in production
            // eslint-disable-next-line no-console
            console.warn("Cobe globe initialization skipped due to WebGL/context error:", err);
            globe = null;
        }

        return () => {
            try {
                globe?.destroy?.();
            } catch (err) {
                // swallow cleanup errors
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" {...props} />;
};