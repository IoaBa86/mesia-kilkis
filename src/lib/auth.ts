// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Your authentication logic
        if (credentials.email === process.env.ADMIN_EMAIL && 
            credentials.password === "admin123") {
          
          // Create or find user in database
          try {
            const user = await prisma.user.upsert({
              where: { email: credentials.email },
              update: { 
                name: "Admin",
                role: "ADMIN"
              },
              create: {
                email: credentials.email,
                name: "Admin",
                role: "ADMIN"
              }
            })

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          } catch (error) {
            console.error("Error creating/finding user:", error)
            // Fallback to static user for development
            return {
              id: "admin-1",
              email: credentials.email,
              name: "Admin",
              role: "ADMIN",
            }
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "ADMIN"
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.name = token.name as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}
