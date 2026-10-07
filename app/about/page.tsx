import Image from "next/image"
import { BookOpen, Heart, Target, Users } from "lucide-react"

const values = [
  {
    title: "Compassion",
    text: "We approach every individual with empathy, understanding, and genuine care for their wellbeing and dignity.",
    icon: Heart,
  },
  {
    title: "Collaboration",
    text: "We believe in the power of partnership and work together with communities, organizations, and stakeholders.",
    icon: Users,
  },
  {
    title: "Commitment",
    text: "We are dedicated to our mission and maintain unwavering commitment to the communities we serve.",
    icon: Target,
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-28">
      <section className="story-container grid gap-10 pb-16 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">About SOH</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
            Dedicated to the most vulnerable in our communities.
          </h1>
        </div>
        <div className="relative min-h-[420px] overflow-hidden border border-black/10 bg-white">
          <Image src="/image.jpeg" alt="Stone of Help Foundation community outreach" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
        </div>
      </section>

      <section className="story-container grid gap-6 py-10 md:grid-cols-2">
        <article className="border-l-4 border-primary bg-white p-8">
          <Target className="mb-6 h-10 w-10 text-primary" />
          <h2 className="font-display text-3xl font-bold">Our Vision</h2>
          <p className="mt-4 leading-7 text-slate-600">
            To create a world where every vulnerable person has access to education, nutrition, and opportunities for
            empowerment, fostering sustainable community development and hope.
          </p>
        </article>
        <article className="border-l-4 border-accent bg-white p-8">
          <Heart className="mb-6 h-10 w-10 text-primary" />
          <h2 className="font-display text-3xl font-bold">Our Mission</h2>
          <p className="mt-4 leading-7 text-slate-600">
            To nourish, educate, and empower the most vulnerable members of society through comprehensive programs that
            address their immediate needs while building long-term capacity for self-sufficiency.
          </p>
        </article>
      </section>

      <section className="bg-[#071b2f] py-20 text-white">
        <div className="story-container">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-accent">Core Values</p>
            <h2 className="font-display text-4xl font-bold md:text-6xl">The principles behind the work.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <article key={value.title} className="border border-white/12 p-7">
                  <Icon className="mb-8 h-10 w-10 text-accent" />
                  <h3 className="font-display text-3xl font-bold">{value.title}</h3>
                  <p className="mt-4 leading-7 text-white/70">{value.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="story-container grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Key Initiatives</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">Education, nutrition, and community capacity.</h2>
        </div>
        <div className="space-y-8">
          {[
            "Education initiative focuses on providing quality learning opportunities to children and youth in underserved communities.",
            "Nutrition and healthcare access ensure vulnerable populations have basic necessities for healthy living and development.",
            "Community development programs build stronger, more resilient communities through capacity building and sustainable economic opportunities.",
          ].map((text, index) => (
            <div key={text} className="grid gap-5 border-t border-black/15 pt-8 md:grid-cols-[90px_1fr]">
              <div className="font-display text-5xl font-bold text-primary/25">0{index + 1}</div>
              <p className="text-xl leading-8 text-slate-700">{text}</p>
            </div>
          ))}
          <div className="bg-white p-8">
            <BookOpen className="mb-5 h-9 w-9 text-primary" />
            <p className="text-lg leading-8 text-slate-700">
              We measure our success not just in numbers, but in transformed lives, strengthened communities, and the
              hope we bring to those who need it most.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
