"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function ContactPage() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would integrate with your newsletter service
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">Get in touch with us to learn more about our work or get involved</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Get In Touch</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+234 812 874 7573</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">sohfoundation@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Stone of Help Foundation
                      <br />
                      Nigeria
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://web.facebook.com/people/Yetunde-Oluloto/pfbid0VHHCScM4UJasmLJmEs79wuQgDP5nNrEAdzUBZotTCmTP8XJzvv5p3Ypm3ih6hTUfl/" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/sohf_oundation?igsh=MWN4NDRibjA3Z2owbA==" className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-600 mb-6">
                    Stay updated with our latest programs, events, and impact stories. Join our community of supporters
                    and be part of the change.
                  </p>

                  {!isSubscribed ? (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full"
                      />
                      <Button type="submit" className="w-full">
                        Subscribe to Newsletter
                      </Button>
                      <p className="text-xs text-gray-500">
                        By subscribing, you agree to receive updates from Stone of Help Foundation. You can unsubscribe
                        at any time.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                      <p className="text-gray-600">
                        You've successfully subscribed to our newsletter. We'll keep you updated on our latest
                        activities and impact.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="mt-8">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input placeholder="Your Name" required />
                      <Input type="email" placeholder="Your Email" required />
                    </div>
                    <Input placeholder="Subject" required />
                    <Textarea placeholder="Your Message" rows={5} required />
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg mb-6 opacity-90">
                Join us in our mission to nourish, educate, and empower vulnerable communities. Every contribution, big
                or small, makes a lasting impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Involved
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
