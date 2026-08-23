// src/middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    pages: {
      // Must match authOptions.pages.signIn (src/lib/auth.ts) — without this,
      // withAuth doesn't know /admin/login is the sign-in page and applies
      // the authorized() check to it too, bouncing unauthenticated visitors
      // to NextAuth's generic default sign-in page instead.
      signIn: "/admin/login",
    },
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is accessing admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "ADMIN"
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}
