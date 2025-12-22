// Pterodactyl API helper functions
// API Documentation: https://dashflo.net/docs/api/pterodactyl/v1/

interface PterodactylPaginatedResponse<T> {
  object: string
  data: T[]
  meta: {
    pagination: {
      total: number
      count: number
      per_page: number
      current_page: number
      total_pages: number
      links: Record<string, string>
    }
  }
}

interface PterodactylServer {
  object: "server"
  attributes: {
    id: number
    external_id: string | null
    uuid: string
    identifier: string
    name: string
    description: string
    status: string | null
    suspended: boolean
    limits: {
      memory: number
      swap: number
      disk: number
      io: number
      cpu: number
      threads: string | null
      oom_disabled: boolean
    }
    feature_limits: {
      databases: number
      allocations: number
      backups: number
    }
    user: number
    node: number
    allocation: number
    nest: number
    egg: number
    container: {
      startup_command: string
      image: string
      installed: number
      environment: Record<string, string>
    }
    created_at: string
    updated_at: string
  }
}

interface PterodactylUser {
  object: "user"
  attributes: {
    id: number
    external_id: string | null
    uuid: string
    username: string
    email: string
    first_name: string
    last_name: string
    language: string
    root_admin: boolean
    "2fa": boolean
    created_at: string
    updated_at: string
  }
}

interface PterodactylNode {
  object: "node"
  attributes: {
    id: number
    uuid: string
    public: boolean
    name: string
    description: string | null
    location_id: number
    fqdn: string
    scheme: string
    behind_proxy: boolean
    maintenance_mode: boolean
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    upload_size: number
    daemon_listen: number
    daemon_sftp: number
    daemon_base: string
    created_at: string
    updated_at: string
    allocated_resources?: {
      memory: number
      disk: number
    }
  }
}

async function fetchFromPterodactyl<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${process.env.GAMEPANEL_API}${endpoint}`, {
    headers: {
      "Authorization": `Bearer ${process.env.GAMEPANEL_API_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
      // Headers to bypass Cloudflare bot protection
      "User-Agent": "NodeByte-Website/1.0 (https://nodebyte.host)",
      "CF-Access-Client-Id": process.env.CF_ACCESS_CLIENT_ID || "",
      "CF-Access-Client-Secret": process.env.CF_ACCESS_CLIENT_SECRET || "",
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  })

  if (!response.ok) {
    throw new Error(`Pterodactyl API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getServers(page = 1, perPage = 50): Promise<PterodactylPaginatedResponse<PterodactylServer>> {
  return fetchFromPterodactyl(`/application/servers?page=${page}&per_page=${perPage}`)
}

export async function getServerCount(): Promise<number> {
  const response = await getServers(1, 1)
  return response.meta.pagination.total
}

export async function getUsers(page = 1, perPage = 50): Promise<PterodactylPaginatedResponse<PterodactylUser>> {
  return fetchFromPterodactyl(`/application/users?page=${page}&per_page=${perPage}`)
}

export async function getUserCount(): Promise<number> {
  const response = await getUsers(1, 1)
  return response.meta.pagination.total
}

export async function getNodes(): Promise<PterodactylPaginatedResponse<PterodactylNode>> {
  return fetchFromPterodactyl(`/application/nodes?include=allocated_resources`)
}

export async function getNodeCount(): Promise<number> {
  const response = await getNodes()
  return response.meta.pagination.total
}

export async function getStats(): Promise<{
  servers: number
  users: number
  nodes: number
  totalMemory: number
  totalDisk: number
  allocatedMemory: number
  allocatedDisk: number
}> {
  const [serversData, usersData, nodesData] = await Promise.all([
    getServers(1, 1),
    getUsers(1, 1),
    getNodes(),
  ])

  let totalMemory = 0
  let totalDisk = 0
  let allocatedMemory = 0
  let allocatedDisk = 0

  for (const node of nodesData.data) {
    const attrs = node.attributes
    totalMemory += attrs.memory
    totalDisk += attrs.disk
    if (attrs.allocated_resources) {
      allocatedMemory += attrs.allocated_resources.memory
      allocatedDisk += attrs.allocated_resources.disk
    }
  }

  return {
    servers: serversData.meta.pagination.total,
    users: usersData.meta.pagination.total,
    nodes: nodesData.meta.pagination.total,
    totalMemory,
    totalDisk,
    allocatedMemory,
    allocatedDisk,
  }
}

export type {
  PterodactylPaginatedResponse,
  PterodactylServer,
  PterodactylUser,
  PterodactylNode,
}
