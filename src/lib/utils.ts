import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const FRIENDSHIP_LEVEL_LOOKUP = [
  'Acquaintance',
  'Casual Friends',
  'Close Friends',
  'Intimate Friends'
]

export const FRIENDSHIP_LEVEL_COLORS = [
  'bg-purple-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-red-400'
]
