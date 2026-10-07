import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Stone of Help Foundation - Nourish, Educate, Empower",
  description:
    "Dedicated to nourishing, educating, and empowering the most vulnerable members of our communities through comprehensive programs that create lasting positive change.",
  openGraph: {
    title: "Stone of Help Foundation",
    description:
      "Nourishing, educating, and empowering vulnerable communities through real humanitarian work.",
    images: ["/image1.jpeg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
