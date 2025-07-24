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
// Gallery Manager
function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [editFiles, setEditFiles] = useState<FileList | null>(null)
  const [newItem, setNewItem] = useState({
    title: "",
    event_date: "",
    location: "",
    description: "",
    image_urls: [] as string[],
  })
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const { toast } = useToast()

  const fetchGalleryItems = async () => {
    try {
      const response = await fetch("/api/gallery")
      const result = await response.json()
      if (response.ok) {
        setGalleryItems(result.data || [])
      } else {
        toast({ title: "Error", description: "Failed to fetch gallery items", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Fetch error", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (!files || files.length === 0) return
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  for (const file of files) {
    if (!allowed.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Only JPEG, PNG, or WebP allowed", variant: "destructive" })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB per image", variant: "destructive" })
      return
    }
  }
  if (editingItem) {
    setEditFiles(files)
  } else {
    setSelectedFiles(files)
  }
  }


  const uploadImages = async (files: FileList): Promise<string[] | null> => {
    const formData = new FormData()
    Array.from(files).forEach(file => formData.append("files", file))

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const result = await response.json()
      if (response.ok && result.urls) return result.urls
      toast({ title: "Upload failed", description: result.error || "", variant: "destructive" })
      return null
    } catch {
      toast({ title: "Upload error", description: "Check your connection", variant: "destructive" })
      return null
    }
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFiles) {
      toast({ title: "No images selected", variant: "destructive" })
      return
    }

    setUploading(true)
    const uploadedUrls = await uploadImages(selectedFiles)
    if (!uploadedUrls) return setUploading(false)

    try {
      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, image_urls: uploadedUrls }),
      })
      const result = await response.json()
      if (response.ok) {
        setGalleryItems([result.data, ...galleryItems])
        setNewItem({ title: "", event_date: "", location: "", description: "", image_urls: [] })
        setSelectedFiles(null)
        toast({ title: "Success", description: "Item added" })
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Add failed", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  const handleEditClick = (item: any) => {
    setEditingItem(item)
    setNewItem(item)
    setEditFiles(null)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    let urls = newItem.image_urls
    if (editFiles) {
      const uploaded = await uploadImages(editFiles)
      if (uploaded) urls = uploaded
      else return setUploading(false)
    }

    try {
      const response = await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newItem, image_urls: urls }),
      })

      const result = await response.json()
      if (response.ok) {
        setGalleryItems(galleryItems.map(item => (item.id === result.data.id ? result.data : item)))
        setEditingItem(null)
        setNewItem({ title: "", event_date: "", location: "", description: "", image_urls: [] })
        setEditFiles(null)
        toast({ title: "Updated", description: "Gallery item updated" })
      } else {
        toast({ title: "Update failed", description: result.error, variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Update error", variant: "destructive" })
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteItem = async (id: number) => {
    if (!confirm("Are you sure?")) return
    try {
      const response = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" })
      if (response.ok) {
        setGalleryItems(galleryItems.filter(item => item.id !== id))
        toast({ title: "Deleted", description: "Item removed" })
      } else {
        toast({ title: "Failed", description: "Could not delete", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Delete error", variant: "destructive" })
    }
  }

  if (loading) return <div className="py-12 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={editingItem ? handleEditSubmit : handleAddItem} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Event Name</Label>
                <Input id="title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={newItem.event_date} onChange={(e) => setNewItem({ ...newItem, event_date: e.target.value })} required />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" value={newItem.location} onChange={(e) => setNewItem({ ...newItem, location: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="images">Images {editingItem ? "(optional)" : "(required)"}</Label>
              <Input id="images" type="file" accept="image/*" multiple onChange={handleFileSelect} className="mt-2" required={!editingItem} />
              {(selectedFiles || editFiles) && (
                <p className="mt-2 text-sm text-green-600">
                  Selected: {Array.from(selectedFiles || editFiles || []).map(f => f.name).join(", ")}
                </p>
              )}
            </div>
            <Button type="submit" disabled={uploading}>
              {uploading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : editingItem ? "Update" : "Add"}
            </Button>
            {editingItem && (
              <Button type="button" variant="ghost" onClick={() => {
                setEditingItem(null)
                setNewItem({ title: "", event_date: "", location: "", description: "", image_urls: [] })
                setEditFiles(null)
              }}>
                Cancel
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Gallery Items ({galleryItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                <div className="flex gap-2 overflow-x-auto max-w-full">
                  {(item.image_urls || []).map((url: string, index: number) => (
                    <div key={index} className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={url}
                        alt={`${item.title} - ${index + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" /> {new Date(item.event_date).toLocaleDateString()}
                    <MapPin className="w-4 h-4 ml-2" /> {item.location}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditClick(item)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteItem(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
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
