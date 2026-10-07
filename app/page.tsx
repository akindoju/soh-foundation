"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Building2, Calendar, HeartHandshake, MapPin, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryItem = {
  id: number
  title: string
  description: string
  event_date: string
  location: string
  image_urls?: string[]
}

const impactAreas = [
  {
    title: "Education",
    text: "Providing quality education and learning opportunities to children and youth in underserved communities.",
    icon: BookOpen,
    image: "/L12.jpg",
  },
  {
    title: "Nutrition & Health",
    text: "Ensuring access to nutritious meals and healthcare services for vulnerable populations.",
    icon: Utensils,
    image: "/N2.jpg",
  },
  {
    title: "Community Development",
    text: "Building stronger communities through infrastructure development and capacity building.",
    icon: Building2,
    image: "/hero-slide-2.jpg",
  },
]

const fallbackStories: GalleryItem[] = [
  {
    id: 1,
    title: "Children's Day Celebration",
    event_date: "2024-05-23",
    location: "Noble Kings Academy & LEA Primary Dutse",
    description:
      "Celebrated Children's Day at Noble Kings Academy & LEA Primary Dutse, bringing joy and educational activities to hundreds of children.",
    image_urls: ["/L12.jpg", "/L5.jpg", "/L3.jpg"],
  },
  {
    id: 2,
    title: "Skill Acquisition Program",
    event_date: "2024-08-29",
    location: "Bmuko Community",
    description:
      "Empowered adolescent girls in Bmuko community with valuable skills training and entrepreneurship opportunities.",
    image_urls: ["/hero-slide-2.jpg", "/image3.jpeg"],
  },
]

const defaultHeroImages = [
  "/image1.jpeg",
  "/image2.jpeg",
  "/L12.jpg",
  "/L5.jpg",
  "/N2.jpg",
  "/hero-slide-2.jpg",
  "/image3.jpeg",
  "/L3.jpg",
]

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
}

export default function HomePage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    let mounted = true
    fetch("/api/gallery")
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        if (mounted && result?.data?.length) setGalleryItems(result.data)
      })
      .catch(() => undefined)
    return () => {
      mounted = false
    }
  }, [])

  const stories = useMemo(() => (galleryItems.length ? galleryItems.slice(0, 3) : fallbackStories), [galleryItems])
  const featured = stories[0]
  const heroImages = useMemo(() => {
    const uploadedImages = stories.flatMap((story) => story.image_urls || []).filter(Boolean)
    const uniqueImages = Array.from(new Set([...uploadedImages, ...defaultHeroImages]))
    return uniqueImages.slice(0, 8)
  }, [stories])

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <section className="relative min-h-[92vh] bg-slate-950 text-white">
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="hero-image-flow absolute inset-y-[-8%] left-1/2 grid w-[1120px] grid-cols-4 gap-4 opacity-80 md:w-[1380px] md:gap-5">
            {[0, 1, 2, 3].map((column) => (
              <div
                key={column}
                className={`hero-flow-column flex flex-col gap-4 md:gap-5 ${column % 2 === 0 ? "hero-flow-up" : "hero-flow-down"}`}
              >
                {Array.from({ length: 8 }, (_, index) => heroImages[(column * 2 + index) % heroImages.length]).map((image, index) => (
                  <div
                    key={`${image}-${column}-${index}`}
                    className={`relative overflow-hidden border border-white/10 bg-white/10 shadow-2xl ${
                      index % 3 === 0 ? "h-64 md:h-80" : "h-48 md:h-64"
                    }`}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      priority={column === 0 && index < 2}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,22,0.92),rgba(3,10,22,0.68),rgba(3,10,22,0.24))]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="story-container relative z-10 flex min-h-[92vh] items-end pb-20 pt-32">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.32em] text-accent">
              Stone of Help Foundation
            </p>
            <h1 className="font-display text-5xl font-bold leading-[0.98] text-balance md:text-7xl lg:text-8xl">
              Nourish, educate, and empower the most vulnerable.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/82 md:text-xl">
              A humanitarian foundation documenting real work in real communities through education, nutrition, health,
              and empowerment programs.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/gallery">
                  See Recent Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/70 bg-transparent text-white hover:bg-white hover:text-slate-950">
                <Link href="/contact">Get Involved</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="story-container grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Who We Are</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
            Dedicated to nourishing, educating, and empowering communities.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <p className="text-lg leading-8 text-slate-600">
            Stone of Help Foundation supports vulnerable members of society through comprehensive programs that address
            immediate needs while building long-term capacity for self-sufficiency.
          </p>
          <div className="relative min-h-[320px] overflow-hidden border border-black/10 bg-white image-reveal">
            <Image src="/image2.jpeg" alt="SOH Foundation outreach with community members" fill className="object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="bg-[#071b2f] py-20 text-white">
        <div className="story-container">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
            <h2 className="font-display text-4xl font-bold md:text-6xl">Our impact areas</h2>
            <p className="max-w-2xl text-lg leading-8 text-white/70">
              Programs are presented through practical support, community presence, and activities that help people move
              from vulnerability toward opportunity.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {impactAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <article key={area.title} className={`group relative min-h-[420px] overflow-hidden ${index === 1 ? "lg:mt-14" : ""}`}>
                  <Image src={area.image} alt={`${area.title} program photography`} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <Icon className="mb-5 h-9 w-9 text-accent" />
                    <h3 className="font-display text-3xl font-bold">{area.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/78">{area.text}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="story-container py-20">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Recent Activities</p>
            <h2 className="font-display text-4xl font-bold md:text-6xl">Real work, visibly documented.</h2>
          </div>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/gallery">Open the visual archive</Link>
          </Button>
        </div>

        {featured && (
          <article className="grid overflow-hidden border border-black/10 bg-white lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[420px] lg:min-h-[560px]">
              <Image src={featured.image_urls?.[0] || "/image1.jpeg"} alt={featured.title} fill className="object-cover" sizes="(min-width: 1024px) 60vw, 100vw" />
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <div>
                <div className="mb-5 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {formatDate(featured.event_date)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {featured.location}
                  </span>
                </div>
                <h3 className="font-display text-4xl font-bold leading-tight text-slate-950 md:text-5xl">{featured.title}</h3>
                <p className="mt-6 text-lg leading-8 text-slate-600">{featured.description}</p>
              </div>
              <Link href="/gallery" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">
                View the full story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        )}
      </section>

      <section className="bg-primary py-20 text-white">
        <div className="story-container grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <HeartHandshake className="mb-6 h-12 w-12 text-accent" />
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">Join our mission.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              Together, we can make a lasting impact in the lives of the most vulnerable members of our community.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">Get Involved</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/70 bg-transparent text-white hover:bg-white hover:text-primary">
              <Link href="/about">Learn About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
