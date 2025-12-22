import { NextResponse } from "next/server"

export const revalidate = 60 // Cache for 60 seconds

interface InstatusPage {
  name: string
  url: string
  status: "UP" | "HASISSUES" | "UNDERMAINTENANCE"
}

interface InstatusIncident {
  id: string
  name: string
  started: string
  status: string
  impact: string
  url: string
  updatedAt: string
}

interface InstatusMaintenance {
  id: string
  name: string
  start: string
  status: string
  duration: string
  url: string
  updatedAt: string
}

interface InstatusResponse {
  page: InstatusPage
  activeIncidents: InstatusIncident[]
  activeMaintenances: InstatusMaintenance[]
}

export async function GET() {
  try {
    const response = await fetch("https://nodebytestat.us/summary.json", {
      next: { revalidate: 60 },
      headers: {
        "Accept": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Instatus API returned ${response.status}`)
    }

    const data: InstatusResponse = await response.json()

    // Safely handle potentially undefined arrays
    const activeIncidents = data.activeIncidents || []
    const activeMaintenances = data.activeMaintenances || []

    return NextResponse.json({
      status: data.page?.status || "UP",
      url: data.page?.url || "https://nodebytestat.us",
      hasIncidents: activeIncidents.length > 0,
      hasMaintenance: activeMaintenances.length > 0,
      incidents: activeIncidents.map((incident) => ({
        id: incident.id,
        name: incident.name,
        status: incident.status,
        impact: incident.impact,
        url: incident.url,
      })),
      maintenances: activeMaintenances.map((maintenance) => ({
        id: maintenance.id,
        name: maintenance.name,
        status: maintenance.status,
        url: maintenance.url,
      })),
    })
  } catch (error) {
    console.error("Failed to fetch Instatus data:", error)
    
    // Return a fallback response
    return NextResponse.json(
      {
        status: "UP",
        url: "https://nodebytestat.us",
        hasIncidents: false,
        hasMaintenance: false,
        incidents: [],
        maintenances: [],
        error: "Failed to fetch status",
      },
      { status: 200 } // Still return 200 to not break the UI
    )
  }
}
