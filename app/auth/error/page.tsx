import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { Button } from "@/packages/ui/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/packages/ui/components/ui/card"
import { AlertCircle, Home, ArrowLeft } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const t = await getTranslations("auth.error")

  const errorMessages: Record<string, string> = {
    Configuration: t("configuration"),
    AccessDenied: t("accessDenied"),
    Verification: t("verification"),
    Default: t("default"),
    CredentialsSignin: t("credentialsSignin"),
  }

  const errorMessage = params.error
    ? errorMessages[params.error] || errorMessages.Default
    : errorMessages.Default

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-background to-muted/20">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-destructive/10 p-4 text-center">
            <p className="text-sm text-destructive">{errorMessage}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("tryAgain")}
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t("goHome")}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
