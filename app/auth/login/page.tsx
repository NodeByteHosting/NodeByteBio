import { getTranslations } from "next-intl/server"
import { LoginForm } from "@/packages/auth/components"
import { auth } from "@/packages/auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function LoginPage() {
  // Redirect if already logged in
  const session = await auth()
  if (session?.user) {
    redirect("/")
  }

  const t = await getTranslations("auth")

  const translations = {
    title: t("login.title"),
    description: t("login.description"),
    emailLabel: t("login.emailLabel"),
    emailPlaceholder: t("login.emailPlaceholder"),
    passwordLabel: t("login.passwordLabel"),
    passwordPlaceholder: t("login.passwordPlaceholder"),
    loginButton: t("login.loginButton"),
    loggingIn: t("login.loggingIn"),
    forgotPassword: t("login.forgotPassword"),
    noAccount: t("login.noAccount"),
    createAccount: t("login.createAccount"),
    errors: {
      invalid: t("login.errors.invalid"),
      networkError: t("login.errors.networkError"),
      generic: t("login.errors.generic"),
    },
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10">
        <Suspense>
          <LoginForm translations={translations} />
        </Suspense>
      </div>
    </main>
  )
}
