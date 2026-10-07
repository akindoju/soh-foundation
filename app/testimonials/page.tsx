import Image from "next/image"
import Link from "next/link"
import { Quote, Star } from "lucide-react"

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
    <div className="min-h-screen bg-background pt-28">
      <section className="story-container grid gap-8 pb-16 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Testimonials</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
            Voices from lives touched and communities served.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Stories from people connected to SOH Foundation's education, empowerment, and community support work.
        </p>
      </section>

      <section className="story-container space-y-10 pb-20">
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.id}
            className={`grid gap-0 overflow-hidden bg-white lg:grid-cols-[0.52fr_1fr] ${index % 2 ? "lg:grid-flow-col-dense" : ""}`}
          >
            <div className={`relative min-h-[320px] ${index % 2 ? "lg:col-start-2" : ""}`}>
              <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="p-8 md:p-12">
              <Quote className="mb-6 h-10 w-10 text-primary" />
              <blockquote className="font-display text-2xl leading-snug text-slate-900 md:text-4xl">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="font-semibold text-lg">{testimonial.name}</h2>
                  <p className="text-slate-500">{testimonial.role}</p>
                </div>
                <div className="flex items-center gap-1" aria-label={`${testimonial.rating} star rating`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}

        <div className="bg-primary p-8 text-center text-white md:p-12">
          <h2 className="font-display text-4xl font-bold">Share Your Story</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/78">
            Have you been impacted by our programs? We would love to hear from you and share your story of
            transformation.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="mailto:sohfoundation@gmail.com" className="inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90">
              Share Your Testimonial
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
