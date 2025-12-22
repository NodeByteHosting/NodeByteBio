import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateUser } from "./auth-service"

// Extend the built-in types
declare module "next-auth" {
  interface User {
    id: string
    email: string
    username: string
    firstName: string | null
    lastName: string | null
    isAdmin: boolean
    pterodactylId: number | null
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    email: string
    username: string
    firstName: string | null
    lastName: string | null
    isAdmin: boolean
    pterodactylId: number | null
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null
        }

        const result = await authenticateUser(credentials.email, credentials.password)

        if (!result.success || !result.user) {
          return null
        }

        return {
          id: result.user.id,
          email: result.user.email,
          username: result.user.username,
          firstName: result.user.firstName,
          lastName: result.user.lastName,
          isAdmin: result.user.isAdmin,
          pterodactylId: result.user.pterodactylId,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email!
        token.username = user.username
        token.firstName = user.firstName
        token.lastName = user.lastName
        token.isAdmin = user.isAdmin
        token.pterodactylId = user.pterodactylId
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        firstName: token.firstName,
        lastName: token.lastName,
        isAdmin: token.isAdmin,
        pterodactylId: token.pterodactylId,
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
})

// Helper function to require admin authentication
export async function requireAdmin() {
  const session = await auth()

  if (!session?.user) {
    return { authorized: false, error: "Not authenticated", status: 401 }
  }

  if (!session.user.isAdmin) {
    return { authorized: false, error: "Admin access required", status: 403 }
  }

  return { authorized: true, user: session.user, status: 200 }
}

// Helper function to require any authentication
export async function requireAuth() {
  const session = await auth()

  if (!session?.user) {
    return { authorized: false, error: "Not authenticated", status: 401 }
  }

  return { authorized: true, user: session.user, status: 200 }
}
