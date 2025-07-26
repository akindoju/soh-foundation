import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, BookOpen, Wrench, Lightbulb } from "lucide-react"
import Image from "next/image"

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-600">
              Comprehensive programs designed to nourish, educate, and empower vulnerable communities
            </p>
          </div>

          {/* Recent Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Recent Events</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/L12.jpg"
                    alt="Children's Day Celebration"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      May 23, 2024
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      Noble Kings Academy & LEA Primary Dutse
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Children's Day Celebration</h3>
                  <p className="text-gray-600 mb-4">
                    A joyous celebration bringing together children from Noble Kings Academy and LEA Primary School
                    Dutse. The event featured educational activities, games, entertainment, and nutritious meals for
                    over 300 children. Our team organized interactive learning sessions, distributed educational
                    materials, and created lasting memories for the children while emphasizing the importance of
                    education and community support.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    300+ children participated
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src="/hero-slide-2.jpg"
                    alt="Skill Acquisition Program"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      <Calendar className="w-3 h-3 mr-1" />
                      August 29, 2024
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      Bmuko Community
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Skill Acquisition Program</h3>
                  <p className="text-gray-600 mb-4">
                    An empowerment initiative targeting adolescent girls in the Bmuko community. The program focused on
                    practical skills training including tailoring, crafts, basic entrepreneurship, and financial
                    literacy. Participants received training materials, certificates, and ongoing mentorship to help
                    them establish small businesses and achieve economic independence.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    45 adolescent girls trained
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Core Programs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Our Core Programs </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <BookOpen className="w-16 h-16 mx-auto mb-6 text-blue-600" />
                  <h3 className="text-2xl font-bold mb-4">EDUCATE</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Providing quality education and learning opportunities to children and adults in underserved
                    communities. Our education programs include school infrastructure development, teacher training,
                    educational material distribution, scholarship programs, and adult literacy initiatives. We believe
                    education is the cornerstone of sustainable development and poverty alleviation.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <Wrench className="w-16 h-16 mx-auto mb-6 text-green-600" />
                  <h3 className="text-2xl font-bold mb-4">EMPOWER</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Empowering individuals and communities through skill acquisition, vocational training, and economic
                    opportunities. Our empowerment programs focus on building capacity, providing tools and resources,
                    and creating pathways to self-sufficiency. We offer training in various trades, entrepreneurship
                    support, and microfinance opportunities to help people build sustainable livelihoods.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <Lightbulb className="w-16 h-16 mx-auto mb-6 text-purple-600" />
                  <h3 className="text-2xl font-bold mb-4">INNOVATE</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Fostering innovation and creative solutions to address community challenges. Our innovation programs
                    encourage creative thinking, technology adoption, and sustainable practices. We support
                    community-led initiatives, promote environmental sustainability, and facilitate the development of
                    innovative approaches to social problems through collaboration and knowledge sharing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Service Areas */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6">Service Areas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <h4 className="font-semibold mb-2">Education Support</h4>
                  <p className="text-sm text-gray-600">School programs, literacy, scholarships</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Health & Nutrition</h4>
                  <p className="text-sm text-gray-600">Healthcare access, feeding programs</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Skill Development</h4>
                  <p className="text-sm text-gray-600">Vocational training, entrepreneurship</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Community Building</h4>
                  <p className="text-sm text-gray-600">Infrastructure, capacity building</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
