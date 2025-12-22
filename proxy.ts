import { auth } from "@/packages/auth"
import { prisma } from "@/packages/core/lib/prisma"
import { NextResponse } from "next/server"

export default auth(async (req) => {
  const { pathname } = req.nextUrl

  // Create response with pathname header for layout to use
  const response = NextResponse.next({
    request: {
      headers: new Headers(req.headers),
    },
  })
  response.headers.set("x-pathname", pathname)

  // Protect admin panel routes - check database for isAdmin (not JWT)
  if (pathname.startsWith("/admin")) {
    // Not logged in - redirect to login
    if (!req.auth?.user?.id) {
      const loginUrl = new URL("/auth/login", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check admin status from database (JWT might be stale)
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.auth.user.id },
        select: { isAdmin: true },
      })

      if (!user?.isAdmin) {
        // Not an admin - redirect to home
        return NextResponse.redirect(new URL("/", req.url))
      }
    } catch (error) {
      console.error("[Middleware] Failed to check admin status:", error)
      // On error, deny access for safety
      return NextResponse.redirect(new URL("/", req.url))
    }

    return response
  }

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!req.auth?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: req.auth.user.id },
        select: { isAdmin: true },
      })

      if (!user?.isAdmin) {
        return NextResponse.json(
          { success: false, error: "Forbidden - Admin access required" },
          { status: 403 }
        )
      }
    } catch (error) {
      console.error("[Middleware] Failed to check admin status:", error)
      return NextResponse.json(
        { success: false, error: "Internal server error" },
        { status: 500 }
      )
    }

    return response
  }

  // Protect panel API routes
  if (pathname.startsWith("/api/panel")) {
    // API routes handle their own auth via requireAdmin()
    // This middleware is for additional protection and can be extended
    return response
  }

  // Allow all other routes with pathname header
  return response
})

export const config = {
  // Matcher for routes that need auth checking
  // Exclude static files, images, and public assets
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
