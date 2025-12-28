"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/packages/ui/components/ui/accordion"
import { HelpCircle } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: "What games do you support?",
    answer:
      "We support a wide range of popular games including Minecraft (Java & Bedrock), Rust, ARK: Survival Evolved, Valheim, Terraria, and many more. We're constantly adding support for new games based on community requests.",
  },
  {
    question: "How quickly can I get started?",
    answer:
      "Your server is deployed instantly after payment! Our automated systems provision your server within seconds, and you'll receive login credentials via email immediately. You can start playing within minutes.",
  },
  {
    question: "Do you offer DDoS protection?",
    answer:
      "Yes! All our servers come with enterprise-grade DDoS protection included at no extra cost. We use advanced filtering to ensure your gaming experience remains uninterrupted.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, PayPal, and various cryptocurrency options. All payments are processed securely through our payment partners.",
  },
  {
    question: "Can I upgrade my server later?",
    answer:
      "Absolutely! You can upgrade or downgrade your server at any time through our client portal. Changes are applied instantly with no data loss.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer 24/7 support through our ticket system and Discord community. Our team of gaming enthusiasts is always ready to help you with any issues or questions.",
  },
]

interface LinksFAQProps {
  className?: string
}

export function LinksFAQ({ className }: LinksFAQProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Section header */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ Accordion */}
      <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border/50 px-4"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4 text-sm sm:text-base">
                <span className="pr-4">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
