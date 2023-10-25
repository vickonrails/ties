import { djb2Hash } from "./utils"

/**
 * pick from a random set of colors
 */
const variants = ['bg-blue-400', 'bg-purple-400', 'bg-green-400', 'bg-fuchsia-400', 'bg-orange-400']
const hashColors = (text: string) => {
    const index = djb2Hash(text, variants.length)
    return variants[index]
}

export default hashColors