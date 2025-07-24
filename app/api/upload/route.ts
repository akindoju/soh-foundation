import { type NextRequest, NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    const uploadedUrls: string[] = []

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
      }

      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "One of the files is too large" }, { status: 400 })
      }

      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `gallery/${fileName}`

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const { error } = await supabaseServer.storage
        .from("images")
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
      }

      const { data: urlData } = supabaseServer.storage.from("images").getPublicUrl(filePath)
      uploadedUrls.push(urlData.publicUrl)
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
