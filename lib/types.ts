
import { Database } from './database.types'

export type ConnectionInsert = Database['public']['Tables']['connection']['Insert']
export type Connection = Database['public']['Tables']['connection']['Row']

export type ReachOutInsert = Database['public']['Tables']['reach_outs']['Insert']
export type ReachOut = Database['public']['Tables']['reach_outs']['Row']