"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Calendar, MapPin, Edit, Trash2, Plus, LogOut, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

// Mock authentication state
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would authenticate with Supabase
    if (email === "admin@sohfoundation.com" && password === "admin123") {
      setIsAuthenticated(true)
      setUser({ email, role: "admin" })
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return { isAuthenticated, user, login, logout }
}

// Login Component
function LoginForm({ onLogin }: { onLogin: (email: string, password: string) => boolean }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = onLogin(email, password)
    if (!success) {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">SOH Foundation Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-600">
            <p>Demo credentials:</p>
            <p>Email: admin@sohfoundation.com</p>
            <p>Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Gallery Management Component
function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    event_date: "",
    location: "",
    description: "",
    image_url: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  // Fetch gallery items
  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery")
      const result = await response.json()
      if (response.ok) {
        setGalleryItems(result.data || [])
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch gallery items",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch gallery items",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPEG, PNG, or WebP image",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
    }
  }

  // Upload image
  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      if (response.ok) {
        return result.url
      } else {
        toast({
          title: "Upload failed",
          description: result.error || "Failed to upload image",
          variant: "destructive",
        })
        return null
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      })
      return null
    }
  }

  // Handle form submission
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Upload image first
      const imageUrl = await uploadImage(selectedFile)
      if (!imageUrl) {
        setUploading(false)
        return
      }

      // Create gallery item
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newItem,
          image_url: imageUrl,
        }),
      })

      const result = await response.json()
      if (response.ok) {
        setGalleryItems([result.data, ...galleryItems])
        setNewItem({ title: "", event_date: "", location: "", description: "", image_url: "" })
        setSelectedFile(null)
        // Reset file input
        const fileInput = document.getElementById("image") as HTMLInputElement
        if (fileInput) fileInput.value = ""

        toast({
          title: "Success",
          description: "Gallery item added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add gallery item",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add gallery item",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  // Delete gallery item
  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const response = await fetch(`/api/gallery?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setGalleryItems(galleryItems.filter((item) => item.id !== id))
        toast({
          title: "Success",
          description: "Gallery item deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to delete gallery item",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Gallery Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Event Name</Label>
                <Input
                  id="title"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newItem.event_date}
                  onChange={(e) => setNewItem({ ...newItem, event_date: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newItem.location}
                onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Image Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG, WebP up to 5MB</p>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="mt-2"
                    required
                  />
                  {selectedFile && <p className="mt-2 text-sm text-green-600">Selected: {selectedFile.name}</p>}
                </div>
              </div>
            </div>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Add Gallery Item"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Gallery Items ({galleryItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {galleryItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No gallery items found. Add your first item above.</p>
            ) : (
              galleryItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.event_date).toLocaleDateString()}
                      <MapPin className="w-4 h-4 ml-2" />
                      {item.location}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Content Editor Component (keeping existing implementation)
function ContentEditor() {
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Children's Day Celebration",
      date: "2024-05-23",
      description: "Celebrated Children's Day at Noble Kings Academy & LEA Primary Dutse",
    },
    {
      id: 2,
      title: "Skill Acquisition Program",
      date: "2024-08-29",
      description: "Empowered adolescent girls in Bmuko community",
    },
  ])

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Babatunde Naomi Tinuoluwa",
      role: "Community Leader",
      quote: "Stone of Help Foundation has been a beacon of hope in our community.",
    },
    {
      id: 2,
      name: "Faith Oluwatomi",
      role: "Program Beneficiary",
      quote: "The skill acquisition program changed my life completely.",
    },
  ])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Services Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{service.title}</h3>
                    <Badge variant="secondary" className="mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {service.date}
                    </Badge>
                    <p className="text-gray-600 mt-2">{service.description}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-gray-700 mt-2 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Admin Dashboard
export default function AdminPage() {
  const { isAuthenticated, user, login, logout } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">SOH Foundation Admin Panel</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gallery">Gallery Management</TabsTrigger>
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentEditor />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">admin@sohfoundation.com</h3>
                        <Badge>Admin</Badge>
                      </div>
                      <div className="text-sm text-gray-600">Last login: Today</div>
                    </div>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
