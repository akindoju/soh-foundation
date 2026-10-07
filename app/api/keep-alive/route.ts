import { NextResponse, type NextRequest } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabaseAdmin"

export const dynamic = "force-dynamic"

function isAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    return process.env.NODE_ENV !== "production"
  }

  return request.headers.get("authorization") === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (process.env.SUPABASE_KEEP_ALIVE_ENABLED === "false") {
    return NextResponse.json({
      enabled: false,
      message: "Supabase keep-alive is disabled.",
    })
  }

  try {
    const supabaseAdmin = getSupabaseAdmin()
    const checkedAt = new Date().toISOString()

    const [{ data: galleryPing, error: galleryError }, { data: storagePing, error: storageError }] =
      await Promise.all([
        supabaseAdmin.from("gallery").select("id").limit(1),
        supabaseAdmin.storage.from("images").list("gallery", { limit: 1 }),
      ])

    if (galleryError || storageError) {
      return NextResponse.json(
        {
          enabled: true,
          checkedAt,
          error: galleryError?.message || storageError?.message || "Supabase keep-alive failed",
        },
        { status: 500 },
      )
    }

    return NextResponse.json({
      enabled: true,
      checkedAt,
      database: { ok: true, rowsTouched: galleryPing?.length ?? 0 },
      storage: { ok: true, objectsTouched: storagePing?.length ?? 0 },
    })
  } catch {
    return NextResponse.json({ enabled: true, error: "Supabase keep-alive failed" }, { status: 500 })
  }
}
