"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-background pt-28">
      <section className="story-container grid gap-10 pb-16 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Contact Us</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
            Get in touch and take part in the work.
          </h1>
        </div>
        <div className="relative min-h-[390px] overflow-hidden border border-black/10 bg-white">
          <Image src="/N3.jpg" alt="SOH Foundation community activity" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>
      </section>

      <section className="story-container grid gap-10 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Get In Touch</h2>
            <div className="mt-6 space-y-5">
              <a href="tel:+2348128747573" className="flex items-center gap-4 text-slate-700 hover:text-primary">
                <Phone className="h-6 w-6 text-primary" />
                <span>+234 812 874 7573</span>
              </a>
              <a href="mailto:sohfoundation@gmail.com" className="flex items-center gap-4 text-slate-700 hover:text-primary">
                <Mail className="h-6 w-6 text-primary" />
                <span>sohfoundation@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-slate-700">
                <MapPin className="h-6 w-6 text-primary" />
                <span>Stone of Help Foundation, Nigeria</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>
            <div className="flex gap-3">
              <a aria-label="Facebook" href="https://web.facebook.com/people/Yetunde-Oluloto/pfbid0VHHCScM4UJasmLJmEs79wuQgDP5nNrEAdzUBZotTCmTP8XJzvv5p3Ypm3ih6hTUfl/" className="grid h-11 w-11 place-items-center border border-black/15 text-primary hover:bg-primary hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a aria-label="Twitter" href="#" className="grid h-11 w-11 place-items-center border border-black/15 text-primary hover:bg-primary hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/sohf_oundation?igsh=MWN4NDRibjA3Z2owbA==" className="grid h-11 w-11 place-items-center border border-black/15 text-primary hover:bg-primary hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a aria-label="LinkedIn" href="#" className="grid h-11 w-11 place-items-center border border-black/15 text-primary hover:bg-primary hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <form onSubmit={handleNewsletterSubmit} className="bg-white p-7">
            <h2 className="font-display text-3xl font-bold">Subscribe to Our Newsletter</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Stay updated with our latest programs, events, and impact stories.
            </p>
            {!isSubscribed ? (
              <div className="mt-6 space-y-4">
                <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
                  Subscribe
                </Button>
              </div>
            ) : (
              <p className="mt-6 border-l-4 border-secondary bg-secondary/10 p-4 text-secondary">
                Thank you. You have successfully subscribed to our newsletter.
              </p>
            )}
          </form>

          <form className="bg-[#071b2f] p-7 text-white">
            <h3 className="font-display text-3xl font-bold">Send Us a Message</h3>
            <div className="mt-6 space-y-4">
              <Input placeholder="Your Name" required className="bg-white text-slate-950" />
              <Input type="email" placeholder="Your Email" required className="bg-white text-slate-950" />
              <Input placeholder="Subject" required className="bg-white text-slate-950" />
              <Textarea placeholder="Your Message" rows={5} required className="bg-white text-slate-950" />
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
