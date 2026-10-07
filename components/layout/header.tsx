"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (pathname?.startsWith("/admin")) return null

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ]

  const isHomeTop = pathname === "/" && !scrolled && !isMenuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        isHomeTop
          ? "bg-transparent text-white"
          : "border-b border-black/10 bg-[#fbf8f0]/95 text-slate-950 shadow-sm backdrop-blur"
      }`}
    >
      <div className="story-container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="SOH Foundation Logo"
              width={48}
              height={48}
              className="rounded-full border border-white/30 bg-white object-cover"
            />
            <div>
              <div className={`font-display text-lg font-bold leading-none ${isHomeTop ? "text-white" : "text-primary"}`}>
                SOH Foundation
              </div>
              <div className={`mt-1 text-[11px] uppercase tracking-[0.24em] ${isHomeTop ? "text-white/75" : "text-slate-500"}`}>
                Stone of Help
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold transition-colors ${
                  isHomeTop ? "text-white/82 hover:text-white" : "text-slate-700 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            className="hidden bg-primary text-white hover:bg-primary/90 lg:inline-flex"
          >
            <Link href="/gallery">
              See the Work
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${isHomeTop ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-black/10 bg-[#fbf8f0] lg:hidden">
            <nav className="grid gap-1 py-5">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-1 py-3 text-lg font-semibold text-slate-800 transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
