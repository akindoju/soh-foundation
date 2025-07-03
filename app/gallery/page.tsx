"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Eye, Loader2 } from "lucide-react"
import Image from "next/image"

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const [selectedImage, setSelectedImage] = useState<any | null>(null)

  // Fetch gallery items from API
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

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
              <p className="text-xl text-gray-600">Capturing moments of impact and transformation in our communities</p>
            </div>
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-gray-600">Capturing moments of impact and transformation in our communities</p>
          </div>

          {galleryItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No gallery items available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              {/* Gallery Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-64">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setSelectedImage(item)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
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
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* View All Button */}
              {!showAll && galleryItems.length > 6 && (
                <div className="text-center">
                  <Button onClick={() => setShowAll(true)} size="lg">
                    View All ({galleryItems.length - 6} more)
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                <div className="relative h-96">
                  <Image
                    src={selectedImage.image_url || "/placeholder.svg"}
                    alt={selectedImage.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
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
