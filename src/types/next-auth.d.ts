import { User } from "next-auth"

declare module "next-auth/jwt" {
  /** Es retornado por el callback `jwt` y `getToken`, cuando se usan sesiones JWT */
  // Permite que el usuario del token JWT se asigne al usuario de la sesión
  interface JWT {
    user: User
  }
}
