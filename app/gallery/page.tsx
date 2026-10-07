"use client"

import { useEffect, useMemo, useState } from "react"
import { Calendar, ChevronLeft, ChevronRight, Loader2, MapPin, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryItem = {
  id: number
  title: string
  description: string
  event_date: string
  location: string
  image_urls?: string[]
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })
}

function imageAlt(item: GalleryItem, index: number) {
  return `${item.title} photograph ${index + 1}`
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch("/api/gallery")
        const result = await response.json()
        if (response.ok) setGalleryItems(result.data || [])
      } catch (error) {
        console.error("Failed to fetch gallery items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const displayedItems = useMemo(() => (showAll ? galleryItems : galleryItems.slice(0, 8)), [galleryItems, showAll])
  const selectedImages = selectedItem?.image_urls || []

  const openModal = (item: GalleryItem, index = 0) => {
    setSelectedItem(item)
    setCurrentSlide(index)
  }

  const closeModal = () => setSelectedItem(null)

  const nextSlide = () => {
    if (!selectedImages.length) return
    setCurrentSlide((prev) => (prev === selectedImages.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    if (!selectedImages.length) return
    setCurrentSlide((prev) => (prev === 0 ? selectedImages.length - 1 : prev - 1))
  }

  useEffect(() => {
    if (!selectedItem) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal()
      if (event.key === "ArrowRight") nextSlide()
      if (event.key === "ArrowLeft") prevSlide()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [selectedItem, selectedImages.length])

  return (
    <div className="min-h-screen bg-background pt-28">
      <section className="story-container grid gap-8 pb-14 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Visual Archive</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
            Gallery of real activities and community impact.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Capturing moments of impact and transformation in our communities through photographs uploaded by the SOH
          Foundation team.
        </p>
      </section>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-9 w-9 animate-spin text-primary" />
        </div>
      ) : galleryItems.length === 0 ? (
        <section className="story-container pb-24">
          <div className="border border-black/10 bg-white p-10 text-center">
            <p className="text-lg text-slate-600">No gallery items available yet. Check back soon.</p>
          </div>
        </section>
      ) : (
        <section className="story-container pb-24">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {displayedItems.map((item, itemIndex) => {
              const images = item.image_urls?.length ? item.image_urls : ["/placeholder.jpg"]
              const cover = images[0]
              return (
                <article
                  key={item.id}
                  className="group flex min-h-0 flex-col overflow-hidden border border-black/10 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => openModal(item)}
                    className="block w-full text-left"
                    aria-label={`Open ${item.title} gallery`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <img
                        src={cover}
                        alt={imageAlt(item, 0)}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        loading={itemIndex < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent opacity-90" />
                      {images.length > 1 && (
                        <div className="absolute right-4 top-4 bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
                          {images.length} images
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <div className="mb-3 flex flex-wrap gap-3 text-xs text-white/78">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-accent" />
                            {formatDate(item.event_date)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-accent" />
                            {item.location}
                          </span>
                        </div>
                        <h2 className="font-display text-3xl font-bold leading-tight">{item.title}</h2>
                      </div>
                    </div>
                  </button>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    {images.length > 1 && (
                      <div className="mt-auto grid grid-cols-4 gap-2 pt-4">
                        {images.slice(1, 5).map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() => openModal(item, index + 1)}
                            className="relative h-20 overflow-hidden bg-slate-100"
                            aria-label={`Open ${item.title} image ${index + 2}`}
                          >
                            <img src={image} alt={imageAlt(item, index + 1)} className="h-full w-full object-cover" loading="lazy" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {!showAll && galleryItems.length > 8 && (
            <div className="mt-10 text-center">
              <Button onClick={() => setShowAll(true)} size="lg" className="bg-primary text-white hover:bg-primary/90">
                View All ({galleryItems.length - 8} more)
              </Button>
            </div>
          )}
        </section>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-[#030711]/95 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} image viewer`}
        >
          <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
            <div className="flex items-center justify-between border-b border-white/10 p-4 md:px-7">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                  {currentSlide + 1} / {selectedImages.length}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">{selectedItem.title}</h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="grid h-11 w-11 place-items-center border border-white/20 transition hover:bg-white hover:text-slate-950"
                aria-label="Close gallery viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative min-h-0 bg-black/20">
              {selectedImages.length > 0 && (
                <img
                  src={selectedImages[currentSlide]}
                  alt={imageAlt(selectedItem, currentSlide)}
                  className="h-full max-h-[calc(100vh-260px)] min-h-[280px] w-full object-contain"
                />
              )}
              {selectedImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/12 text-white backdrop-blur transition hover:bg-white hover:text-slate-950 md:left-7"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/12 text-white backdrop-blur transition hover:bg-white hover:text-slate-950 md:right-7"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            <div className="grid max-h-[220px] gap-4 overflow-y-auto border-t border-white/10 p-4 md:grid-cols-[1fr_1.6fr] md:px-7">
              <div className="flex flex-wrap gap-3 text-sm text-white/65">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-accent" />
                  {formatDate(selectedItem.event_date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  {selectedItem.location}
                </span>
              </div>
              <p className="max-w-4xl text-sm leading-6 text-white/72 md:text-base">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
