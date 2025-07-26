import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Target, BookOpen, Utensils, Building } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Stone of Help Foundation</h1>
            <p className="text-xl text-gray-600">
              Dedicated to nourishing, educating, and empowering the most vulnerable in our communities
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="p-8">
                <Target className="w-12 h-12 mb-4 text-blue-600" />
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600">
                  To create a world where every vulnerable person has access to education, nutrition, and opportunities
                  for empowerment, fostering sustainable community development and hope.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <Heart className="w-12 h-12 mb-4 text-red-600" />
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600">
                  To nourish, educate, and empower the most vulnerable members of society through comprehensive programs
                  that address their immediate needs while building long-term capacity for self-sufficiency.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <h3 className="text-xl font-semibold mb-3">Compassion</h3>
                  <p className="text-gray-600">
                    We approach every individual with empathy, understanding, and genuine care for their wellbeing and
                    dignity.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                  <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
                  <p className="text-gray-600">
                    We believe in the power of partnership and work together with communities, organizations, and
                    stakeholders.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Target className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-semibold mb-3">Commitment</h3>
                  <p className="text-gray-600">
                    We are dedicated to our mission and maintain unwavering commitment to the communities we serve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Initiatives */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Key Initiatives</h2>
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <BookOpen className="w-12 h-12 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Education</h3>
                      <p className="text-gray-600 mb-4">
                        Our education initiative focuses on providing quality learning opportunities to children and
                        youth in underserved communities. We believe education is the foundation for breaking the cycle
                        of poverty and creating lasting change.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>School infrastructure development and improvement</li>
                        <li>Educational materials and resources provision</li>
                        <li>Teacher training and capacity building</li>
                        <li>Scholarship programs for deserving students</li>
                        <li>Adult literacy and continuing education programs</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Utensils className="w-12 h-12 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Nutrition & Health</h3>
                      <p className="text-gray-600 mb-4">
                        We address the critical needs of nutrition and healthcare access, ensuring that vulnerable
                        populations have the basic necessities for healthy living and development.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Nutritional support and feeding programs</li>
                        <li>Healthcare access and medical outreach</li>
                        <li>Health education and awareness campaigns</li>
                        <li>Maternal and child health programs</li>
                        <li>Clean water and sanitation initiatives</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <Building className="w-12 h-12 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-semibold mb-4">Community Development</h3>
                      <p className="text-gray-600 mb-4">
                        Our community development programs focus on building stronger, more resilient communities
                        through infrastructure development, capacity building, and sustainable economic opportunities.
                      </p>
                      <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>Infrastructure development and improvement</li>
                        <li>Skill acquisition and vocational training</li>
                        <li>Microfinance and economic empowerment</li>
                        <li>Community leadership development</li>
                        <li>Environmental sustainability projects</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact Statement */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
              <p className="text-gray-700 text-lg">
                Since our inception, Stone of Help Foundation has touched thousands of lives through our comprehensive
                programs. We measure our success not just in numbers, but in the transformed lives, strengthened
                communities, and the hope we bring to those who need it most.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
