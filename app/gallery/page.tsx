"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Eye, Loader2, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch("/api/gallery")
        const result = await response.json()
        if (response.ok) {
          setGalleryItems(result.data || [])
        }
      } catch (error) {
        console.error("Failed to fetch gallery items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const displayedItems = showAll ? galleryItems : galleryItems.slice(0, 6)

  const handleOpenModal = (item: any) => {
    setSelectedImage(item)
    setCurrentSlide(0)
  }

  const nextSlide = () => {
    if (selectedImage) {
      setCurrentSlide((prev) =>
        prev === selectedImage.image_urls.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevSlide = () => {
    if (selectedImage) {
      setCurrentSlide((prev) =>
        prev === 0 ? selectedImage.image_urls.length - 1 : prev - 1
      )
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-gray-600">Capturing moments of impact and transformation in our communities</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No gallery items available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 overflow-x-auto whitespace-nowrap flex gap-2 p-2">
                      {(item.image_urls || []).map((img: string, index: number) => (
                        <div key={index} className="relative h-44 w-64 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={img}
                            alt={`Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(item.event_date).toLocaleDateString()}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(item)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {!showAll && galleryItems.length > 6 && (
                <div className="text-center">
                  <Button onClick={() => setShowAll(true)} size="lg">
                    View All ({galleryItems.length - 6} more)
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Modal with Slider */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center px-4">
              <div className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden">
                <button
                  className="absolute top-3 right-3 text-gray-700 hover:text-black"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Image Slider */}
                <div className="relative h-96 bg-gray-100">
                  {selectedImage.image_urls.length > 0 && (
                    <Image
                      src={selectedImage.image_urls[currentSlide]}
                      alt={`Slide ${currentSlide + 1}`}
                      fill
                      className="object-contain"
                    />
                  )}
                  {selectedImage.image_urls.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(selectedImage.event_date).toLocaleDateString()}
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      {selectedImage.location}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{selectedImage.title}</h2>
                  <p className="text-gray-600 mb-6">{selectedImage.description}</p>
                  <Button onClick={() => setSelectedImage(null)}>Close</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
