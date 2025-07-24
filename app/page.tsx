"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Utensils, Building } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const sliderImages = ["/image1.jpeg", "/image2.jpeg", "/image3.jpeg"]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Image Slider */}
      <section className="relative min-h-[50vh] md:min-h-[80vh] overflow-hidden">
        {sliderImages.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Writeup (Bottom Left, No Background) */}
        <div className="absolute bottom-6 left-6 z-20 text-white">
          <h1 className="text-xl md:text-2xl font-bold mb-1">Stone of Help Foundation</h1>
          <p className="text-sm md:text-base mb-2">Nourish, Educate, and Empower the Most Vulnerable</p>
          <Button asChild size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact Areas</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-4">Education</h3>
                  <p className="text-gray-600">
                    Providing quality education and learning opportunities to children and youth in underserved
                    communities.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <Utensils className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <h3 className="text-xl font-semibold mb-4">Nutrition & Health</h3>
                  <p className="text-gray-600">
                    Ensuring access to nutritious meals and healthcare services for vulnerable populations.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-8">
                  <Building className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-xl font-semibold mb-4">Community Development</h3>
                  <p className="text-gray-600">
                    Building stronger communities through infrastructure development and capacity building.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Recent Activities</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      May 23, 2024
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Children's Day Celebration</h3>
                  <p className="text-gray-600 mb-4">
                    Celebrated Children's Day at Noble Kings Academy & LEA Primary Dutse, bringing joy and educational
                    activities to hundreds of children.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      August 29, 2024
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Skill Acquisition Program</h3>
                  <p className="text-gray-600 mb-4">
                    Empowered adolescent girls in Bmuko community with valuable skills training and entrepreneurship
                    opportunities.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/services">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 opacity-90">
              Together, we can make a lasting impact in the lives of the most vulnerable members of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">Get Involved</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                <Link href="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
