"use client";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { ComponentProps, forwardRef, useEffect, useRef, useImperativeHandle } from "react";

export const Pre = forwardRef<HTMLPreElement, ComponentProps<"pre">>((props, forwardedRef) => {
    const innerRef = useRef<HTMLPreElement | null>(null);

    // expose the inner ref to parent via forwarded ref
    // use non-null assertion for the handle return to satisfy React.Ref typing
    useImperativeHandle(forwardedRef, () => innerRef.current!, [innerRef]);

    const onCopy = () => {
        if (innerRef.current == null || innerRef.current.textContent == null) return;
        navigator.clipboard.writeText(innerRef.current.textContent);
    };

    return (
        <div className="relative">
            <CopyButton onCopy={onCopy} />
            <pre {...props} ref={innerRef}>
                {props.children}
            </pre>
        </div>
    );
});

function CopyButton({ onCopy }: { onCopy: () => void }) {
    const [checked, setChecked] = React.useState(false);

    const onClick = () => {
        onCopy();
        setChecked(true);
    };

    return (
        <button
            className="absolute top-1 right-1 p-2 bg-secondary text-secondary-foreground border-[1px] rounded-md"
            onClick={onClick}
        >
            {checked ? (
                <CheckIcon className="w-3 h-3" />
            ) : (
                <CopyIcon className="w-3 h-3" />
            )}
        </button>
    );
}