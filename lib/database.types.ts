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
          bio: string | null
          birthday: string | null
          city: string | null
          company: string | null
          contact_frequency: string | null
          contact_info: Json[] | null
          contact_time: string | null
          country: string | null
          created_at: string | null
          email_address: string
          friendship_level: number | null
          fullname: string
          id: string
          interests: string[] | null
          occupation: string | null
          origin_context: string | null
          reach_out_frequency: string | null
          timezone: string | null
          updated_at: string | null
          value_to_me: string | null
          value_to_them: string | null
        }
        Insert: {
          bio?: string | null
          birthday?: string | null
          city?: string | null
          company?: string | null
          contact_frequency?: string | null
          contact_info?: Json[] | null
          contact_time?: string | null
          country?: string | null
          created_at?: string | null
          email_address: string
          friendship_level?: number | null
          fullname: string
          id?: string
          interests?: string[] | null
          occupation?: string | null
          origin_context?: string | null
          reach_out_frequency?: string | null
          timezone?: string | null
          updated_at?: string | null
          value_to_me?: string | null
          value_to_them?: string | null
        }
        Update: {
          bio?: string | null
          birthday?: string | null
          city?: string | null
          company?: string | null
          contact_frequency?: string | null
          contact_info?: Json[] | null
          contact_time?: string | null
          country?: string | null
          created_at?: string | null
          email_address?: string
          friendship_level?: number | null
          fullname?: string
          id?: string
          interests?: string[] | null
          occupation?: string | null
          origin_context?: string | null
          reach_out_frequency?: string | null
          timezone?: string | null
          updated_at?: string | null
          value_to_me?: string | null
          value_to_them?: string | null
        }
        Relationships: []
      }
      reach_outs: {
        Row: {
          connection_id: string
          created_at: string | null
          email_address: string
          id: string
          message: string | null
          type: number
          updated_at: string | null
        }
        Insert: {
          connection_id: string
          created_at?: string | null
          email_address: string
          id?: string
          message?: string | null
          type: number
          updated_at?: string | null
        }
        Update: {
          connection_id?: string
          created_at?: string | null
          email_address?: string
          id?: string
          message?: string | null
          type?: number
          updated_at?: string | null
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
