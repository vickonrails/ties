import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  containerProps?: React.HTMLAttributes<HTMLLabelElement>
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, containerProps, label, hint, ...props }, ref) => {
    return (
      <label {...containerProps}>
        {label && <div className="select-none text-sm mb-2 text-muted-foreground">{label}</div>}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />

        {hint && (
          <p className="text-sm mt-2 text-destructive">{hint}</p>
        )}
      </label>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
