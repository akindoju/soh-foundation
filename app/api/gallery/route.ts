import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

// GET - Fetch all gallery items
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

// POST - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, event_date, location, image_url } = body

    if (!title || !description || !event_date || !location || !image_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("gallery")
      .insert([
        {
          title,
          description,
          event_date,
          location,
          image_url,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data: data[0] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create gallery item" }, { status: 500 })
  }
}

// DELETE - Remove gallery item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    // Get the item first to delete the image from storage
    const { data: item } = await supabaseAdmin
      .from("gallery")
      .select("image_url")
      .eq("id", id)
      .single()

    if (item?.image_url) {
      const urlParts = item.image_url.split("/")
      const filePath = `gallery/${urlParts[urlParts.length - 1]}`
      await supabaseAdmin.storage.from("images").remove([filePath])
    }

    const { error } = await supabaseAdmin.from("gallery").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 })
  }
}

// PUT - Update gallery item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, event_date, location, image_url } = body

    if (!id || !title || !description || !event_date || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("gallery")
      .update({
        title,
        description,
        event_date,
        location,
        image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update gallery item" }, { status: 500 })
  }
}

