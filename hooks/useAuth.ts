"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { Session, User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Get initial session
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Error getting session", error)
        setUser(null)
      } else {
        setUser(session?.user ?? null)
      }

      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error.message)
      return false
    }

    setUser(data.user)
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const isAuthenticated = !!user

  return { user, loading, isAuthenticated, login, logout }
}
