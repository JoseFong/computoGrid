import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { Organizacion } from "@prisma/client"
import { prisma } from "@/libs/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

async function getOrg(username: string): Promise<Organizacion | undefined> {
  try {
    const org = await prisma.organizacion.findFirst({
      where: {
        username,
      },
    })

    return org ?? undefined
  } catch (error) {
    console.error("Fallo al obtener organización:", error)
    throw new Error("Fallo al obtener organización")
  }
}

export const handler = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) throw new Error("Complete todos los campos")

        const org = await getOrg(credentials.username)
        if (!org) {
          throw new Error("Organización no encontrada")
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          org.password
        )

        if (passwordsMatch) {
          return { name: org.nombre, id: org.id.toString() }
        }

        throw new Error("Credenciales inválidas")
      },
    }),
  ],
})
