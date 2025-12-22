"use client"

import { useState, useMemo, useEffect } from "react"
import { Rocket, Package, GitBranch, Calendar, RefreshCw, SearchX, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/packages/ui/components/ui/card"
import { Button } from "@/packages/ui/components/ui/button"
import { Skeleton } from "@/packages/ui/components/ui/skeleton"
import { ChangelogCard } from "./changelog-card"
import { ChangelogSearch } from "./changelog-search"
import { ChangelogFilters } from "./changelog-filters"
import { useChangelogReleases } from "../hooks/use-changelog"
import { filterReleases, formatRelativeTime, type ChangelogFilters as Filters } from "../lib/changelog"
import { cn } from "@/packages/core/lib/utils"

interface ChangelogListProps {
  className?: string
}

const ITEMS_PER_PAGE = 4

export function ChangelogList({ className }: ChangelogListProps) {
  const t = useTranslations()
  const { releases, repositories, isLoading, error, lastUpdated, refetch } = useChangelogReleases()
  
  const [filters, setFilters] = useState<Filters>({
    search: "",
    repository: null,
    type: null,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [linkedReleaseId, setLinkedReleaseId] = useState<string | null>(null)

  // Filter releases
  const filteredReleases = useMemo(() => {
    return filterReleases(releases, filters)
  }, [releases, filters])

  // Calculate pagination
  const totalPages = Math.ceil(filteredReleases.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReleases = filteredReleases.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // Handle URL hash for direct release linking
  useEffect(() => {
    if (typeof window !== 'undefined' && releases.length > 0) {
      const hash = window.location.hash.slice(1) // Remove #
      if (hash) {
        // Find the release and calculate which page it's on
        const releaseIndex = filteredReleases.findIndex(
          r => `${r.repository.name}-${r.tag_name}` === hash || r.tag_name === hash
        )
        if (releaseIndex !== -1) {
          const page = Math.floor(releaseIndex / ITEMS_PER_PAGE) + 1
          setCurrentPage(page)
          setLinkedReleaseId(hash) // Track which release is linked
          // Scroll to element after a small delay
          setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
          }, 100)
        }
      }
    }
  }, [releases, filteredReleases])

  const handleClearFilters = () => {
    setFilters({ search: "", repository: null, type: null })
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of list
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search & filters skeleton */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-10 flex-1 max-w-md" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-[200px]" />
            <Skeleton className="h-10 w-[160px]" />
          </div>
        </div>

        {/* Release cards skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className={cn("", className)}>
        <Card className="border-destructive/50">
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-destructive/10 rounded-full mb-4">
              <RefreshCw className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("changelog.error.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("changelog.error.description")}</p>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("changelog.error.retry")}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("changelog.stats.totalReleases")}</p>
              <p className="text-2xl font-bold">{releases.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GitBranch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("changelog.stats.repositories")}</p>
              <p className="text-2xl font-bold">{repositories.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("changelog.stats.latestUpdate")}</p>
              <p className="text-2xl font-bold">
                {lastUpdated ? formatRelativeTime(lastUpdated) : '-'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <ChangelogSearch
          value={filters.search}
          onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
          placeholder={t("changelog.searchPlaceholder")}
          className="flex-1 max-w-md"
        />
        <ChangelogFilters
          repositories={repositories}
          selectedRepository={filters.repository}
          selectedType={filters.type}
          onRepositoryChange={(repo) => setFilters(prev => ({ ...prev, repository: repo }))}
          onTypeChange={(type) => setFilters(prev => ({ ...prev, type: type }))}
          onClearFilters={handleClearFilters}
          translations={{
            all: t("changelog.filters.all"),
            allTypes: t("changelog.filters.allTypes"),
            feature: t("changelog.filters.feature"),
            bugfix: t("changelog.filters.bugfix"),
            improvement: t("changelog.filters.improvement"),
            breaking: t("changelog.filters.breaking"),
            security: t("changelog.filters.security"),
          }}
        />
      </div>

      {/* Releases List */}
      {filteredReleases.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-muted rounded-full mb-4">
              <SearchX className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("changelog.empty.title")}</h3>
            <p className="text-muted-foreground mb-4">{t("changelog.empty.description")}</p>
            <Button onClick={handleClearFilters} variant="outline">
              {t("changelog.empty.clearFilters")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedReleases.map((release, index) => {
              const releaseAnchorId = `${release.repository.name}-${release.tag_name}`
              return (
                <ChangelogCard
                  key={release.id}
                  release={release}
                  isLatest={currentPage === 1 && index === 0 && !filters.search && !filters.repository && !filters.type}
                  isLinked={linkedReleaseId === releaseAnchorId}
                  translations={{
                    viewOnGithub: t("changelog.release.viewOnGithub"),
                    publishedOn: t("changelog.release.publishedOn"),
                    by: t("changelog.release.by"),
                    assets: t("changelog.release.assets"),
                    downloadAsset: t("changelog.release.downloadAsset"),
                    noAssets: t("changelog.release.noAssets"),
                    preRelease: t("changelog.release.preRelease"),
                    latest: t("changelog.release.latest"),
                    draft: t("changelog.release.draft"),
                    copyLink: t("changelog.copyLink"),
                    linkCopied: t("changelog.linkCopied"),
                  }}
                />
              )
            })}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t("changelog.pagination.previous")}
              </Button>
              
              <div className="flex items-center gap-1">
                {/* First page */}
                {currentPage > 2 && (
                  <>
                    <Button
                      variant={currentPage === 1 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(1)}
                      className="w-9 h-9 p-0"
                    >
                      1
                    </Button>
                    {currentPage > 3 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                  </>
                )}

                {/* Pages around current */}
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 5) return true
                    return Math.abs(page - currentPage) <= 1
                  })
                  .map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-9 h-9 p-0"
                    >
                      {page}
                    </Button>
                  ))}

                {/* Last page */}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && (
                      <span className="px-2 text-muted-foreground">...</span>
                    )}
                    <Button
                      variant={currentPage === totalPages ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handlePageChange(totalPages)}
                      className="w-9 h-9 p-0"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {t("changelog.pagination.next")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
