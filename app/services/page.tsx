import Image from "next/image"
import { BookOpen, Calendar, Lightbulb, MapPin, Users, Wrench } from "lucide-react"

const programs = [
  {
    title: "EDUCATE",
    icon: BookOpen,
    text: "Providing quality education and learning opportunities to children and adults in underserved communities. Our education programs include school infrastructure development, teacher training, educational material distribution, scholarship programs, and adult literacy initiatives.",
  },
  {
    title: "EMPOWER",
    icon: Wrench,
    text: "Empowering individuals and communities through skill acquisition, vocational training, and economic opportunities. Our empowerment programs focus on building capacity and creating pathways to self-sufficiency.",
  },
  {
    title: "INNOVATE",
    icon: Lightbulb,
    text: "Fostering innovation and creative solutions to address community challenges through collaboration, knowledge sharing, technology adoption, and sustainable practices.",
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-28">
      <section className="story-container grid gap-8 pb-16 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary">Our Services</p>
          <h1 className="font-display text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
            Programs designed to nourish, educate, and empower.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-slate-600">
          Comprehensive programs designed to nourish, educate, and empower vulnerable communities through practical
          outreach and long-term capacity building.
        </p>
      </section>

      <section className="story-container pb-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              title: "Children's Day Celebration",
              date: "May 23, 2024",
              location: "Noble Kings Academy & LEA Primary Dutse",
              image: "/L12.jpg",
              text: "A joyous celebration bringing together children from Noble Kings Academy and LEA Primary School Dutse. The event featured educational activities, games, entertainment, and nutritious meals.",
              note: "300+ children participated",
            },
            {
              title: "Skill Acquisition Program",
              date: "August 29, 2024",
              location: "Bmuko Community",
              image: "/hero-slide-2.jpg",
              text: "An empowerment initiative targeting adolescent girls in the Bmuko community with practical skills training, entrepreneurship, and financial literacy.",
              note: "45 adolescent girls trained",
            },
          ].map((event, index) => (
            <article key={event.title} className={`bg-white ${index === 1 ? "lg:mt-16" : ""}`}>
              <div className="relative min-h-[360px] overflow-hidden">
                <Image src={event.image} alt={event.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
              <div className="p-7">
                <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {event.location}
                  </span>
                </div>
                <h2 className="font-display text-4xl font-bold">{event.title}</h2>
                <p className="mt-4 leading-7 text-slate-600">{event.text}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <Users className="h-4 w-4" />
                  {event.note}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#071b2f] py-20 text-white">
        <div className="story-container">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.8fr_1fr] md:items-end">
            <h2 className="font-display text-4xl font-bold md:text-6xl">Core programs</h2>
            <p className="text-lg leading-8 text-white/70">
              The work is organized around practical pillars that can adapt to community needs while preserving SOH
              Foundation's core mission.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <article key={program.title} className="border border-white/12 p-7">
                  <Icon className="mb-8 h-10 w-10 text-accent" />
                  <h3 className="font-display text-3xl font-bold">{program.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-white/70">{program.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
