import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="SOH Foundation Logo" width={50} height={50} className="rounded-full" />
              <div>
                <div className="font-bold text-xl">Stone of Help Foundation</div>
                <div className="text-gray-400 text-sm">Nourish • Educate • Empower</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Dedicated to nourishing, educating, and empowering the most vulnerable members of our communities through
              comprehensive programs that create lasting positive change.
            </p>
            <div className="flex gap-4">
              <a href="https://web.facebook.com/people/Yetunde-Oluloto/pfbid0VHHCScM4UJasmLJmEs79wuQgDP5nNrEAdzUBZotTCmTP8XJzvv5p3Ypm3ih6hTUfl/" className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-400 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/sohf_oundation?igsh=MWN4NDRibjA3Z2owbA==" className="p-2 bg-pink-600 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">

              {/* Phone */}
              <a href="tel:+2348128747573" className="flex items-center gap-3 hover:text-blue-300 transition">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+234 812 874 7573</span>
              </a>

              {/* Email */}
              <a href="mailto:1sohfoundation@gmail.com" className="flex items-center gap-3 hover:text-blue-300 transition">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">1sohfoundation@gmail.com</span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <span className="text-gray-300">Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Stone of Help Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
