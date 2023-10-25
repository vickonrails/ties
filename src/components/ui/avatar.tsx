import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as React from "react"

import hashColors from "@/lib/hash-colors"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/**
 * Connection Avatar
 */
type Size = 'xs' | 'sm' | 'md' | 'lg'
interface ConnectionAvatarProps extends AvatarPrimitive.AvatarImageProps {
  fullname: string
  size?: Size
  border?: boolean
}

function getSizeValues(size: Size): { dimensions: string, textSize: string } {
  switch (size) {
    case 'xs':
      return { dimensions: 'h-8 w-8', textSize: 'text-xs' }

    case 'sm':
      return { dimensions: 'h-10 w-10', textSize: 'text-base' }

    case 'md':
      return { dimensions: 'h-16 w-16', textSize: 'text-2xl' }

    case 'lg':
      return { dimensions: 'h-32 w-32', textSize: 'text-5xl' }
  }
}

export function ConnectionAvatar({ fullname, size = 'sm', border, ...rest }: ConnectionAvatarProps) {
  const { dimensions, textSize } = getSizeValues(size)
  const background = hashColors(fullname);
  console.log({ background })
  return (
    <Avatar className={
      cn(dimensions, border && 'border-white border-4')}
      {...rest}
    >
      <AvatarImage src='' />
      {fullname && (
        <AvatarFallback className={cn('text-white', textSize, background)}>
          {fullname.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      )}
    </Avatar>
  )
}

export { Avatar, AvatarFallback, AvatarImage }
