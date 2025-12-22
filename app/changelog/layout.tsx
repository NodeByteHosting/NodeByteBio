import { ReactNode } from "react"

interface ChangelogLayoutProps {
  children: ReactNode
}

export default function ChangelogLayout({ children }: ChangelogLayoutProps) {
  return (
    <main className="pt-16">{children}</main>
  )
}
