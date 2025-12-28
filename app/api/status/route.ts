import { NextResponse } from "next/server"

interface StatusIncident {
  id: string
  name: string
  started: string
  status: string
  impact: string
  url: string
  updatedAt: string
}

interface StatusMaintenance {
  id: string
  name: string
  start: string
  status: string
  duration: string
  url: string
  updatedAt: string
}

interface StatusResponse {
  page: {
    name: string
    url: string
    status: "UP" | "HASISSUES" | "UNDERMAINTENANCE"
  }
  activeIncidents: StatusIncident[]
  activeMaintenances: StatusMaintenance[]
}

export async function GET() {
  try {
    const response = await fetch("https://nodebytestat.us/summary.json", {
      next: { revalidate: 60 }, // Cache for 60 seconds
    })

    if (!response.ok) {
      throw new Error("Failed to fetch status")
    }

    const data: StatusResponse = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching status:", error)
    
    // Return a fallback response
    return NextResponse.json(
      {
        page: {
          name: "NodeByte",
          url: "https://nodebytestat.us",
          status: "UP",
        },
        activeIncidents: [],
        activeMaintenances: [],
      },
      { status: 200 }
    )
  }
}
