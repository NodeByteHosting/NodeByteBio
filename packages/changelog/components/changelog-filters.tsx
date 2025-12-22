"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/packages/ui/components/ui/select"
import { Button } from "@/packages/ui/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/packages/core/lib/utils"

interface ChangelogFiltersProps {
  repositories: string[]
  selectedRepository: string | null
  selectedType: string | null
  onRepositoryChange: (repo: string | null) => void
  onTypeChange: (type: string | null) => void
  onClearFilters: () => void
  translations: {
    all: string
    allTypes: string
    feature: string
    bugfix: string
    improvement: string
    breaking: string
    security: string
  }
  className?: string
}

const RELEASE_TYPES = [
  { value: 'feature', labelKey: 'feature' },
  { value: 'bugfix', labelKey: 'bugfix' },
  { value: 'improvement', labelKey: 'improvement' },
  { value: 'breaking', labelKey: 'breaking' },
  { value: 'security', labelKey: 'security' },
] as const

export function ChangelogFilters({
  repositories,
  selectedRepository,
  selectedType,
  onRepositoryChange,
  onTypeChange,
  onClearFilters,
  translations,
  className,
}: ChangelogFiltersProps) {
  const hasActiveFilters = selectedRepository !== null || selectedType !== null

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {/* Repository Filter */}
      <Select
        value={selectedRepository || "all"}
        onValueChange={(value) => onRepositoryChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={translations.all} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all}</SelectItem>
          {repositories.map((repo) => (
            <SelectItem key={repo} value={repo}>
              {repo.split('/')[1]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Type Filter */}
      <Select
        value={selectedType || "all"}
        onValueChange={(value) => onTypeChange(value === "all" ? null : value)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder={translations.allTypes} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.allTypes}</SelectItem>
          {RELEASE_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {translations[type.labelKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-9 px-3"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
