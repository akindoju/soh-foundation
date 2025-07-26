import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Public client (browser)
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (server only)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);

// Types for database tables
export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image_url?: string;
  rating: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}
