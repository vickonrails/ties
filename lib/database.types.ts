export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      connection: {
        Row: {
          birthday: string | null
          city: string | null
          contactfrequency: string | null
          contactinfo: Json[] | null
          contacttime: string | null
          country: string | null
          created_at: string | null
          friendshiplevel: number | null
          fullname: string
          id: string
          interests: string[] | null
          origincontext: string | null
          timezone: string | null
          updated_at: string | null
          valuetome: string | null
          valuetothem: string | null
        }
        Insert: {
          birthday?: string | null
          city?: string | null
          contactfrequency?: string | null
          contactinfo?: Json[] | null
          contacttime?: string | null
          country?: string | null
          created_at?: string | null
          friendshiplevel?: number | null
          fullname: string
          id?: string
          interests?: string[] | null
          origincontext?: string | null
          timezone?: string | null
          updated_at?: string | null
          valuetome?: string | null
          valuetothem?: string | null
        }
        Update: {
          birthday?: string | null
          city?: string | null
          contactfrequency?: string | null
          contactinfo?: Json[] | null
          contacttime?: string | null
          country?: string | null
          created_at?: string | null
          friendshiplevel?: number | null
          fullname?: string
          id?: string
          interests?: string[] | null
          origincontext?: string | null
          timezone?: string | null
          updated_at?: string | null
          valuetome?: string | null
          valuetothem?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}