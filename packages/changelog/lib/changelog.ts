import type { GitHubRelease } from '@/app/api/github/releases/route'

export interface ChangelogRelease extends GitHubRelease {
  type?: 'feature' | 'bugfix' | 'improvement' | 'breaking' | 'security'
}

export interface ChangelogFilters {
  search: string
  repository: string | null
  type: string | null
}

/**
 * Parse release body to detect the type of release based on keywords
 */
export function detectReleaseType(release: GitHubRelease): ChangelogRelease['type'] {
  const body = (release.body || '').toLowerCase()
  const name = (release.name || release.tag_name).toLowerCase()
  
  // Check for security-related keywords
  if (body.includes('security') || body.includes('vulnerability') || body.includes('cve-')) {
    return 'security'
  }
  
  // Check for breaking changes
  if (body.includes('breaking change') || body.includes('breaking:') || name.includes('breaking')) {
    return 'breaking'
  }
  
  // Check for bug fixes
  if (body.includes('bug fix') || body.includes('bugfix') || body.includes('fix:') || name.includes('fix')) {
    return 'bugfix'
  }
  
  // Check for new features
  if (body.includes('new feature') || body.includes('feat:') || body.includes('feature:') || name.includes('feature')) {
    return 'feature'
  }
  
  // Default to improvement
  return 'improvement'
}

/**
 * Parse markdown body to extract summary (first paragraph)
 */
export function extractSummary(body: string | null, maxLength = 200): string {
  if (!body) return ''
  
  // Remove HTML comments
  let text = body.replace(/<!--[\s\S]*?-->/g, '')
  
  // Remove markdown headers
  text = text.replace(/^#{1,6}\s+.+$/gm, '')
  
  // Get first meaningful paragraph
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0)
  const firstPara = paragraphs[0] || ''
  
  // Clean up markdown formatting
  let cleaned = firstPara
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/[*_`]/g, '') // Remove formatting
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength).trim() + '...'
  }
  
  return cleaned
}

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

/**
 * Format relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

/**
 * Filter releases based on search query and filters
 */
export function filterReleases(
  releases: ChangelogRelease[],
  filters: ChangelogFilters
): ChangelogRelease[] {
  return releases.filter(release => {
    // Filter by repository
    if (filters.repository && release.repository.full_name !== filters.repository) {
      return false
    }
    
    // Filter by type
    if (filters.type && release.type !== filters.type) {
      return false
    }
    
    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const matchName = release.name?.toLowerCase().includes(query)
      const matchTag = release.tag_name.toLowerCase().includes(query)
      const matchBody = release.body?.toLowerCase().includes(query)
      const matchRepo = release.repository.name.toLowerCase().includes(query)
      
      if (!matchName && !matchTag && !matchBody && !matchRepo) {
        return false
      }
    }
    
    return true
  })
}
