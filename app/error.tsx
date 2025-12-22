"use client"

import { ErrorPage } from "@/packages/ui/components/Layouts/Error"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorPage error={error} reset={reset} />
}
