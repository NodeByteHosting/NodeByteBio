"use client"

import { useState, useEffect, useCallback } from 'react'
import type { GitHubRelease, ReleasesResponse } from '@/app/api/github/releases/route'
import { detectReleaseType, type ChangelogRelease } from '../lib/changelog'

interface UseChangelogReleasesOptions {
  initialReleases?: ChangelogRelease[]
}

export function useChangelogReleases(options: UseChangelogReleasesOptions = {}) {
  const [releases, setReleases] = useState<ChangelogRelease[]>(options.initialReleases || [])
  const [repositories, setRepositories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(!options.initialReleases)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchReleases = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/github/releases')
      
      if (!response.ok) {
        throw new Error('Failed to fetch releases')
      }

      const data: ReleasesResponse = await response.json()
      
      // Add type detection to each release
      const releasesWithType: ChangelogRelease[] = data.releases.map(release => ({
        ...release,
        type: detectReleaseType(release)
      }))

      setReleases(releasesWithType)
      setRepositories(data.repositories)
      setLastUpdated(data.lastUpdated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!options.initialReleases) {
      fetchReleases()
    }
  }, [fetchReleases, options.initialReleases])

  return {
    releases,
    repositories,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchReleases
  }
}
