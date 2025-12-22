import { ReactNode } from "react";
import { Navigation } from "@/packages/ui/components/Static/navigation";
import { Footer } from "@/packages/ui/components/Static/footer";

interface KBLayoutProps {
  children: ReactNode;
}

export default function KBLayout({ children }: KBLayoutProps) {
  return (
    <>
      <main className="pt-16">{children}</main>
    </>
  );
}
