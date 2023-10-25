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

/**
 * hash text string to array items
 */
export function djb2Hash(str: string, arrayLength: number) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash) % arrayLength;
}