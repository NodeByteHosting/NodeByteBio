import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { absoluteUrl } from "hooks/absoluteUrl";

export const metadata: Metadata = {
  title: "404",
  description: "Whatever it is you seek to find, doesn't exist at this location.",
  openGraph: {
    url: "https://nodebyte.host",
    title: "404",
    description: "Whatever it is you seek to find, doesn't exist at this location.",
    images: "/logo.png",
    siteName: "NodeByte Hosting",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@TheRealToxicDev",
    title: "404",
    description: "Whatever it is you seek to find, doesn't exist at this location.",
    images: "/banner.png"
  },
  metadataBase: absoluteUrl()
};


const PageHero = dynamic(() => import("components/PageHero").then((m) => m.PageHero));
const ErrorLayout = dynamic(() => import("components/Static/ErrorLayout").then((m) => m.default));

export default function NotFoundPage() {
  return (
    <>
      <PageHero
        title="Page Not Found"
        text="Whoops! Looks like you&apos;ve followed a broken link or entered a URL that doesn't exist on this site."
      />
      <ErrorLayout />
    </>
  );
}
