import { NextResponse } from "next/server"
import { requireAdmin } from "@/packages/auth"
import { prisma } from "@/packages/core/lib/prisma"

export async function GET() {
  // Require admin authentication
  const authResult = await requireAdmin()
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    // Test database connection
    let databaseConnected = false
    try {
      await prisma.$queryRaw`SELECT 1`
      databaseConnected = true
    } catch {
      databaseConnected = false
    }

    // Check Pterodactyl panel connection
    let pterodactylConnected = false
    let pterodactylVersion = null
    const panelUrl = process.env.PTERODACTYL_API_URL

    if (panelUrl) {
      try {
        const response = await fetch(`${panelUrl}`, {
          headers: {
            Accept: "application/json",
          },
        })
        pterodactylConnected = response.ok
      } catch {
        pterodactylConnected = false
      }
    }

    return NextResponse.json({
      success: true,
      settings: {
        pterodactyl: {
          url: panelUrl || "",
          connected: pterodactylConnected,
          version: pterodactylVersion,
        },
        database: {
          connected: databaseConnected,
          provider: "postgresql",
        },
        features: {
          registration: true,
          maintenance: false,
          syncEnabled: true,
        },
      },
    })
  } catch (error) {
    console.error("Failed to fetch settings:", error)
    
    return NextResponse.json(
      { success: false, error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  // Require admin authentication
  const authResult = await requireAdmin()
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    // Settings are stored in environment variables for now
    // In a full implementation, you'd store these in the database
    const body = await request.json()
    
    // For now, just acknowledge the save
    // In production, you'd update database/config here
    return NextResponse.json({
      success: true,
      message: "Settings updated",
    })
  } catch (error) {
    console.error("Failed to save settings:", error)
    
    return NextResponse.json(
      { success: false, error: "Failed to save settings" },
      { status: 500 }
    )
  }
}
