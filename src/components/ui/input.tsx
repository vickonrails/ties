import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  containerProps?: React.HTMLAttributes<HTMLLabelElement>
}

// TODO: add placeholder & hint props
// TODO: error states etc

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerProps, hint, type, label, ...props }, ref) => {
    return (
      <label {...containerProps}>
        {label && <div className="select-none text-muted-foreground text-sm mb-2">{label}</div>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && (
          <p className="text-sm text-destructive">{hint}</p>
        )}
      </label>
    )
  }
)
Input.displayName = "Input"

export { Input }
