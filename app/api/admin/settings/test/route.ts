import { NextResponse } from "next/server"
import { requireAdmin } from "@/packages/auth"
import { prisma } from "@/packages/core/lib/prisma"

export async function GET(request: Request) {
  // Require admin authentication
  const authResult = await requireAdmin()
  if (!authResult.authorized) {
    return NextResponse.json(
      { success: false, error: authResult.error },
      { status: authResult.status }
    )
  }

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (type === "database") {
      const start = Date.now()
      try {
        await prisma.$queryRaw`SELECT 1`
        const latency = Date.now() - start
        return NextResponse.json({
          success: true,
          latency,
        })
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: "Database connection failed",
        })
      }
    }

    if (type === "pterodactyl") {
      const panelUrl = process.env.PTERODACTYL_API_URL
      const apiKey = process.env.PTERODACTYL_API_KEY

      if (!panelUrl || !apiKey) {
        return NextResponse.json({
          success: false,
          error: "Pterodactyl API not configured",
        })
      }

      const start = Date.now()
      try {
        const response = await fetch(`${panelUrl}/api/application/users?per_page=1`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
        })
        const latency = Date.now() - start

        if (response.ok) {
          return NextResponse.json({
            success: true,
            latency,
            version: "1.x", // Could parse from response if available
          })
        } else {
          return NextResponse.json({
            success: false,
            error: `Panel returned status ${response.status}`,
          })
        }
      } catch (error) {
        return NextResponse.json({
          success: false,
          error: "Failed to connect to Pterodactyl panel",
        })
      }
    }

    return NextResponse.json({
      success: false,
      error: "Invalid test type",
    })
  } catch (error) {
    console.error("Connection test failed:", error)
    
    return NextResponse.json(
      { success: false, error: "Connection test failed" },
      { status: 500 }
    )
  }
}
