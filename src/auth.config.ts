import type { AuthOptions, Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.user = user
      }
      return token
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = token.user
      }
      return session
    },
  },
  providers: [],
} satisfies AuthOptions
