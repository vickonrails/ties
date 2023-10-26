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
                    contactfrequency: string | null
                    contactinfo: Json[] | null
                    contacttime: string | null
                    country: string | null
                    created_at: string | null
                    friendshiplevel: number | null
                    fullname: string
                    id: string
                    interests: string[] | null
                    occupation: string | null
                    origincontext: string | null
                    timezone: string | null
                    updated_at: string | null
                    valuetome: string | null
                    valuetothem: string | null
                }
                Insert: {
                    bio?: string | null
                    birthday?: string | null
                    city?: string | null
                    company?: string | null
                    contactfrequency?: string | null
                    contactinfo?: Json[] | null
                    contacttime?: string | null
                    country?: string | null
                    created_at?: string | null
                    friendshiplevel?: number | null
                    fullname: string
                    id?: string
                    interests?: string[] | null
                    occupation?: string | null
                    origincontext?: string | null
                    timezone?: string | null
                    updated_at?: string | null
                    valuetome?: string | null
                    valuetothem?: string | null
                }
                Update: {
                    bio?: string | null
                    birthday?: string | null
                    city?: string | null
                    company?: string | null
                    contactfrequency?: string | null
                    contactinfo?: Json[] | null
                    contacttime?: string | null
                    country?: string | null
                    created_at?: string | null
                    friendshiplevel?: number | null
                    fullname?: string
                    id?: string
                    interests?: string[] | null
                    occupation?: string | null
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
