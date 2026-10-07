"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null

  return (
    <footer className="bg-[#061525] text-white">
      <div className="story-container py-16">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.5fr_0.8fr_0.9fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Image src="/logo.png" alt="SOH Foundation Logo" width={56} height={56} className="rounded-full bg-white" />
              <div>
                <div className="font-display text-2xl font-bold">Stone of Help Foundation</div>
                <div className="text-xs uppercase tracking-[0.28em] text-white/50">Nourish / Educate / Empower</div>
              </div>
            </div>
            <p className="mb-7 max-w-xl text-base leading-7 text-white/70">
              Dedicated to nourishing, educating, and empowering the most vulnerable members of our communities through
              comprehensive programs that create lasting positive change.
            </p>
            <div className="flex gap-3">
              <a aria-label="Facebook" href="https://web.facebook.com/people/Yetunde-Oluloto/pfbid0VHHCScM4UJasmLJmEs79wuQgDP5nNrEAdzUBZotTCmTP8XJzvv5p3Ypm3ih6hTUfl/" className="grid h-10 w-10 place-items-center border border-white/15 transition hover:border-white/45">
                <Facebook className="h-5 w-5" />
              </a>
              <a aria-label="Twitter" href="#" className="grid h-10 w-10 place-items-center border border-white/15 transition hover:border-white/45">
                <Twitter className="h-5 w-5" />
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/sohf_oundation?igsh=MWN4NDRibjA3Z2owbA==" className="grid h-10 w-10 place-items-center border border-white/15 transition hover:border-white/45">
                <Instagram className="h-5 w-5" />
              </a>
              <a aria-label="LinkedIn" href="#" className="grid h-10 w-10 place-items-center border border-white/15 transition hover:border-white/45">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Explore</h3>
            <ul className="space-y-3">
              {[
                ["About Us", "/about"],
                ["Our Services", "/services"],
                ["Gallery", "/gallery"],
                ["Testimonials", "/testimonials"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="group inline-flex items-center gap-2 text-white/75 transition hover:text-white">
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-white/45">Contact</h3>
            <div className="space-y-4">
              <a href="tel:+2348128747573" className="flex items-center gap-3 text-white/75 transition hover:text-white">
                <Phone className="h-5 w-5 text-accent" />
                <span>+234 812 874 7573</span>
              </a>
              <a href="mailto:1sohfoundation@gmail.com" className="flex items-center gap-3 text-white/75 transition hover:text-white">
                <Mail className="h-5 w-5 text-accent" />
                <span>1sohfoundation@gmail.com</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-accent" />
                <span className="text-white/75">Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Stone of Help Foundation. All rights reserved.</p>
          <p>Real communities. Real work. Real hope.</p>
        </div>
      </div>
    </footer>
  )
}
