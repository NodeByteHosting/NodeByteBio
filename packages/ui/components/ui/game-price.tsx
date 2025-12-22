"use client"

import { Price } from "@/packages/ui/components/ui/price"

interface GamePriceProps {
  amountGBP: number
  label: string
}

export function GamePrice({ amountGBP, label }: GamePriceProps) {
  return (
    <div className="text-right">
      <p className="text-xs text-muted-foreground">{label}</p>
      <Price amount={amountGBP} className="text-lg font-bold text-primary" />
    </div>
  )
}
