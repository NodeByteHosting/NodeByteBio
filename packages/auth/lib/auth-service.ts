import { prisma } from "@/packages/core/lib/prisma"
import { syncUserFromPanel } from "@/packages/core/lib/sync"
import bcrypt from "bcryptjs"
import type { User } from "@prisma/client"

const SALT_ROUNDS = 12

interface PterodactylUser {
  id: number
  email: string
  username: string
  first_name: string
  last_name: string
  admin: boolean
}

interface PterodactylUserResponse {
  object: "user"
  attributes: PterodactylUser
}

interface PterodactylListResponse {
  object: "list"
  data: PterodactylUserResponse[]
}

/**
 * Check if a user exists in the Pterodactyl panel by email
 * Uses the Application API with admin key
 */
export async function verifyPterodactylUser(email: string): Promise<PterodactylUser | null> {
  const panelUrl = process.env.GAMEPANEL_URL
  const apiKey = process.env.GAMEPANEL_API_KEY

  if (!panelUrl || !apiKey) {
    console.error("[Auth] Missing GAMEPANEL_URL or GAMEPANEL_API_KEY")
    return null
  }

  try {
    // Search for user by email using the Application API
    const response = await fetch(
      `${panelUrl}/api/application/users?filter[email]=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "NodeByte-Website/1.0 (https://nodebyte.host)",
        },
      }
    )

    if (!response.ok) {
      console.error(`[Auth] Pterodactyl API error: ${response.status}`)
      return null
    }

    const data: PterodactylListResponse = await response.json()

    // Find exact email match (filter is case-insensitive search)
    const user = data.data.find(
      (u) => u.attributes.email.toLowerCase() === email.toLowerCase()
    )

    if (user) {
      return user.attributes
    }

    return null
  } catch (error) {
    console.error("[Auth] Error verifying Pterodactyl user:", error)
    return null
  }
}

/**
 * Register a new user
 * Verifies the user exists in the panel before creating account
 * Handles migrated users (synced from panel but haven't set password yet)
 */
export async function registerUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Check if user already exists in our database
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      // User exists - check if they've already migrated (set password)
      if (existingUser.isMigrated) {
        return { success: false, error: "email_exists" }
      }
      
      // User exists but hasn't set password yet (synced from panel)
      // Let them "register" by setting their password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          isMigrated: true, // Mark as migrated - they've completed registration
          emailVerified: new Date(),
        },
      })
      
      return { success: true, user: updatedUser }
    }

    // User doesn't exist in our DB - verify they exist in Pterodactyl panel
    const pteroUser = await verifyPterodactylUser(email)

    if (!pteroUser) {
      return { success: false, error: "not_in_panel" }
    }

    // Check if pterodactyl ID is already linked to another account
    const existingPteroLink = await prisma.user.findUnique({
      where: { pterodactylId: pteroUser.id },
    })

    if (existingPteroLink) {
      // This pterodactyl account is linked to a different email
      // Check if that account is migrated
      if (existingPteroLink.isMigrated) {
        return { success: false, error: "panel_account_linked" }
      }
      
      // The linked account hasn't migrated - might be email change in panel
      // Update the email and let them register
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
      
      const updatedUser = await prisma.user.update({
        where: { id: existingPteroLink.id },
        data: {
          email: email.toLowerCase(),
          password: hashedPassword,
          isMigrated: true,
          emailVerified: new Date(),
        },
      })
      
      return { success: true, user: updatedUser }
    }

    // Brand new user - create account
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        username: pteroUser.username,
        firstName: pteroUser.first_name || null,
        lastName: pteroUser.last_name || null,
        isAdmin: pteroUser.admin,
        pterodactylId: pteroUser.id,
        isMigrated: true, // Registering directly = already migrated
        emailVerified: new Date(), // Auto-verify since they exist in panel
      },
    })

    return { success: true, user }
  } catch (error) {
    console.error("[Auth] Registration error:", error)
    return { success: false, error: "server_error" }
  }
}

/**
 * Authenticate a user with email and password
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return { success: false, error: "invalid_credentials" }
    }

    // Check if account is active
    if (!user.isActive) {
      return { success: false, error: "account_disabled" }
    }

    // Check if user has set a password (migrated)
    if (!user.password) {
      return { success: false, error: "not_migrated" }
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return { success: false, error: "invalid_credentials" }
    }

    // Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Sync user data from panel in the background (don't block login)
    syncUserFromPanel(user.id).catch((err) => {
      console.error("[Auth] Failed to sync user on login:", err)
    })

    // Return the current user (sync happens in background)
    return { success: true, user }
  } catch (error) {
    console.error("[Auth] Authentication error:", error)
    return { success: false, error: "server_error" }
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
  })
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  })
}

/**
 * Update user's password
 */
export async function updatePassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return { success: false, error: "user_not_found" }
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)

    if (!isValid) {
      return { success: false, error: "invalid_password" }
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("[Auth] Password update error:", error)
    return { success: false, error: "server_error" }
  }
}
