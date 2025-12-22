import { AboutPage } from "@/packages/ui/components/Layouts/About"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NodeByte Hosting - Built by gamers, for gamers. Our mission is to provide fast, reliable, and affordable game server hosting.",
}

export default function About() {
  return <AboutPage />
}
