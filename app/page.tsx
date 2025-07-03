"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, Utensils, Building } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const heroSlides = [
  {
    id: 1,
    image: "/hero-slide-1.jpg",
    title: "Empowering Communities Together",
    subtitle: "Our dedicated team working alongside community members to create lasting change",
  },
  {
    id: 2,
    image: "/hero-slide-2.jpg",
    title: "Building Skills, Building Futures",
    subtitle: "Hands-on training programs that empower individuals with practical life skills",
  },
]

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 10000) // Changed to 10 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Light overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </div>
        ))}

        {/* Content Overlay - Alternating Left/Right */}
        <div className="relative z-10 h-full">
          <div className="container mx-auto px-4 h-full">
            {/* Logo and Content - Alternating Position */}
            <div
              className={`absolute bottom-8 ${
                currentSlide % 2 === 0 ? "left-8" : "right-8"
              } max-w-md transition-all duration-1000`}
            >
              <div className="text-white">
                {/* Small Logo */}
                <div className="mb-4">
                  <Image src="/logo.png" alt="SOH Foundation Logo" width={60} height={60} className="mb-3" />
                </div>

                {/* Foundation Name */}
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Stone of Help Foundation</h1>
                <p className="text-sm md:text-base mb-3 opacity-90">
                  Nourish, Educate, and Empower the Most Vulnerable
                </p>

                {/* Dynamic slide content */}
                <div className="mb-4">
                  <h2 className="text-lg md:text-xl font-semibold mb-2 text-yellow-300">
                    {heroSlides[currentSlide].title}
                  </h2>
                  <p className="text-sm md:text-base opacity-90">{heroSlides[currentSlide].subtitle}</p>
                </div>

                {/* Single Contact Button */}
                <Button asChild size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Rest of the component remains the same */}
      {/* Mission Overview */}
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
