import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { absoluteUrl } from "hooks/absoluteUrl";

// Dynamically load client-only components to avoid prerender errors
const ServicesHero = dynamic(() => import('@/src/components/Layouts/games/mc/Hero').then(m => m.default));
const ButtonScrollProvider = dynamic(() => import("providers/ButtonScroll").then(m => m.default));
const WhyChooseUs = dynamic(() => import("@/src/components/Layouts/games/mc/Benefits").then(m => m.default));
const ServersList = dynamic(() => import("@/src/components/Layouts/games/mc/Servers").then(m => m.default));
const FAQ = dynamic(() => import("@/src/components/Layouts/games/mc/GeneralFAQs").then(m => m.FAQ));

export const metadata: Metadata = {
    title: "Minecraft Hosting",
    description: "Minecraft Hosting Services.",
    openGraph: {
        url: "https://nodebyte.host",
        title: "Services",
        description: "Minecraft Hosting Services.",
        images: "/logo.png",
        siteName: "NodeByte Hosting",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@TheRealToxicDev",
        title: "Services",
        description: "Minecraft Hosting Services.",
        images: "/banner.png"

    },
    metadataBase: absoluteUrl()
}


export default function StatusPage() {
    return (
        <>
            <ButtonScrollProvider>
                <ServicesHero />
                <WhyChooseUs />
                <ServersList />
                <FAQ />
            </ButtonScrollProvider>
        </>
    )
}