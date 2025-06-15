import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          eco_points: number
          walmart_cash: number
          weekly_rank: number
          total_co2_saved: number
          preferences: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          eco_points?: number
          walmart_cash?: number
          weekly_rank?: number
          total_co2_saved?: number
          preferences?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          eco_points?: number
          walmart_cash?: number
          weekly_rank?: number
          total_co2_saved?: number
          preferences?: any
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          brand: string
          price: number
          co2e: number
          water_usage: number
          recyclability_percent: number
          category: string
          image_url: string
          barcode: string
          is_eco_friendly: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          brand: string
          price: number
          co2e: number
          water_usage: number
          recyclability_percent: number
          category: string
          image_url: string
          barcode: string
          is_eco_friendly: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          brand?: string
          price?: number
          co2e?: number
          water_usage?: number
          recyclability_percent?: number
          category?: string
          image_url?: string
          barcode?: string
          is_eco_friendly?: boolean
        }
      }
      scan_history: {
        Row: {
          id: string
          user_id: string
          product_id: string
          scanned_at: string
          action_taken: string
          eco_points_earned: number
          co2_saved: number
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          scanned_at?: string
          action_taken: string
          eco_points_earned: number
          co2_saved: number
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          scanned_at?: string
          action_taken?: string
          eco_points_earned?: number
          co2_saved?: number
        }
      }
      product_alternatives: {
        Row: {
          id: string
          original_product_id: string
          alternative_product_id: string
          co2_savings: number
          created_at: string
        }
        Insert: {
          id?: string
          original_product_id: string
          alternative_product_id: string
          co2_savings: number
          created_at?: string
        }
        Update: {
          id?: string
          original_product_id?: string
          alternative_product_id?: string
          co2_savings?: number
        }
      }
      user_badges: {
        Row: {
          id: string
          user_id: string
          badge_name: string
          badge_description: string
          badge_icon: string
          rarity: string
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          badge_name: string
          badge_description: string
          badge_icon: string
          rarity: string
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          badge_name?: string
          badge_description?: string
          badge_icon?: string
          rarity?: string
        }
      }
    }
  }
}