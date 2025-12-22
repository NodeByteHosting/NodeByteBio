"use client"

import { Button } from "@/packages/ui/components/ui/button"
import { Card } from "@/packages/ui/components/ui/card"
import { CheckCircle2, Zap, ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Price } from "@/packages/ui/components/ui/price"
import { useTranslations } from "next-intl"

interface PricingPlan {
  name: string
  description: string
  /** Price in GBP (base currency) - just the number */
  priceGBP: number
  period: string
  features: string[]
  popular?: boolean
  url?: string
}

interface GamePricingProps {
  gameName: string
  billingUrl: string
  plans: PricingPlan[]
  comingSoon?: boolean
}

export function GamePricing({ gameName, billingUrl, plans, comingSoon }: GamePricingProps) {
  const t = useTranslations()
  
  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm text-accent">
            <Zap className="w-4 h-4" />
            <span>{t("gamePage.pricing.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {gameName}{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("gamePage.pricing.title")}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("gamePage.pricing.description")}
          </p>
        </div>

        {comingSoon ? (
          <Card className="max-w-xl mx-auto border-border/50 bg-card/30 backdrop-blur-sm p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{t("gamePage.pricing.comingSoon")}</h3>
              <p className="text-muted-foreground">
                {t("gamePage.pricing.comingSoonDesc", { game: gameName })}
              </p>
              <Button size="lg" className="gap-2 rounded-full" asChild>
                <Link href="https://discord.gg/wN58bTzzpW" target="_blank">
                  {t("gamePage.pricing.joinDiscord")}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* Pricing Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    "relative overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm",
                    "hover:border-primary/30 transition-all duration-300",
                    "hover:shadow-xl hover:shadow-primary/5",
                    "flex flex-col h-full",
                    plan.popular && "border-primary/50 ring-1 ring-primary/20"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                      {t("gamePage.pricing.mostPopular")}
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                    <div className="mb-6">
                      <Price amount={plan.priceGBP} className="text-4xl font-bold" />
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-6 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">
                            {feature === "FyfeWeb DDoS Protection" ? (
                              <Link 
                                href="https://fyfeweb.com/our-network" 
                                target="_blank" 
                                className="text-primary hover:underline"
                              >
                                {feature}
                              </Link>
                            ) : (
                              feature
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={cn(
                        "w-full gap-2 rounded-lg mt-auto",
                        plan.popular && "bg-primary hover:bg-primary/90"
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link href={plan.url || billingUrl} target="_blank">
                        {t("gamePage.pricing.getStarted")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t("gamePage.pricing.customSolution")}{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  {t("gamePage.pricing.contactUs")}
                </Link>
              </p>
              <Button size="lg" className="gap-2 rounded-full" asChild>
                <Link href={billingUrl} target="_blank">
                  {t("gamePage.pricing.viewAllPlans")}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
