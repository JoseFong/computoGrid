import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { NextUIProvider } from "@nextui-org/react"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./context/AuthProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    template: "Portal Grid | %s",
    default: "Portal Grid",
  },
  description:
    "Portal para administrar la disponibilidad de recursos dentro de un grid",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NextUIProvider>
            <Toaster />
            {children}
          </NextUIProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
