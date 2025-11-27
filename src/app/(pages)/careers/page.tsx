import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { absoluteUrl } from "hooks/absoluteUrl";

export const metadata: Metadata = {
    title: "Careers",
    description: "View our current job openings and join the NodeByte team.",
    openGraph: {
        url: "https://nodebyte.host",
        title: "Careers",
        description: "View our current job openings and join the NodeByte team.",
        images: "/logo.png",
        siteName: "NodeByte Hosting",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@TheRealToxicDev",
        title: "Careers",
        description: "View our current job openings and join the NodeByte team.",
        images: "/banner.png"
    },
    metadataBase: absoluteUrl()
};


const CareersLanding = dynamic(() => import("components/Layouts/Careers").then((m) => m.CareersLanding));

export default function CareersPage() {
    return <CareersLanding />;
}