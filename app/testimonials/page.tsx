import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Babatunde Naomi Tinuoluwa",
    role: "Community Leader",
    image: "/image.jpeg",
    quote:
      "Stone of Help Foundation has been a beacon of hope in our community. Their dedication to education and empowerment has transformed countless lives. The Children's Day celebration they organized brought so much joy to our children and reminded us of the importance of investing in our future generation.",
    rating: 5,
  },
  {
    id: 2,
    name: "Faith Oluwatomi",
    role: "Program Beneficiary",
    image: "/client.jpg",
    quote:
      "The skill acquisition program changed my life completely. I learned valuable skills that have enabled me to start my own small business and support my family. The foundation didn't just teach us skills; they gave us hope and the confidence to believe in ourselves. I am forever grateful for their support.",
    rating: 5,
  },
]

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Testimonials</h1>
            <p className="text-xl text-gray-600">Hear from the lives we've touched and the communities we've served</p>
          </div>

          {/* Testimonials */}
          <div className="space-y-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative w-20 h-20 mx-auto md:mx-0">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Quote className="w-8 h-8 text-blue-600 mb-4" />
                      <blockquote className="text-lg text-gray-700 mb-6 italic leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-16 bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
              <p className="text-gray-700 mb-6">
                Have you been impacted by our programs? We'd love to hear from you and share your story of
                transformation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:sohfoundation@gmail.com"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700"
                >
                  Share Your Testimonial
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-blue-600 bg-white px-6 py-3 text-sm font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
                >
                  Contact Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
