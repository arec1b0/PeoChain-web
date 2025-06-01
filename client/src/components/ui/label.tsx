import React from "react"
import { cn } from "@/lib/utils"

// Instead of importing from radix-ui, we'll create our own simplified LabelPrimitive
const LabelPrimitive = {
  Root: ({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className={className} {...props} />
  ),
  displayName: "Label"
}

// Simplified version of class-variance-authority
const cva = (base: string) => {
  return () => base
}

interface VariantProps {}

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Whether to optimize for mobile touch targets
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, mobileOptimized = true, ...props }: LabelProps, ref: React.Ref<HTMLLabelElement>) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          // Base styles
          labelVariants(),
          // Mobile optimizations - larger touch target and better spacing
          mobileOptimized && "text-base sm:text-sm py-1 sm:py-0.5 inline-block touch-action-manipulation",
          // Add tap highlight transparent to avoid flash on mobile
          "tap-highlight-transparent",
          // Improve touch target size
          "min-h-[32px] sm:min-h-[24px]",
          // Provide custom className
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = LabelPrimitive.displayName

export { Label }
