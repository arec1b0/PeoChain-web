import React from "react"
import { useTouch, useIsMobile } from "@/hooks"

// Create type definitions since we can't import modules directly
type SlotProps = { children?: React.ReactNode }
const Slot: React.FC<SlotProps> = ({ children }: SlotProps) => children as React.ReactElement

// Simplified CVA implementation for our use case
type VariantConfig = Record<string, Record<string, string>>
type DefaultVariants = Record<string, string>

interface VariantOptions {
  className?: string;
  variant?: string;
  size?: string;
  [key: string]: string | undefined;
}

const cva = (base: string, config: { variants: VariantConfig; defaultVariants: DefaultVariants }) => {
  return (options: VariantOptions = {}) => {
    const { className = "", ...variants } = options || {}
    const variantClassNames = Object.entries(variants).map(([variant, value]) => {
      if (!value || !config.variants[variant]) return ""
      return config.variants[variant][value] || ""
    })
    return [base, ...variantClassNames, className].filter(Boolean).join(" ")
  }
}

type VariantProps<T> = {
  variant?: string;
  size?: string;
}

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles with improved mobile touch handling
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium" + 
  // Better focus handling
  " ring-offset-background transition-all" +
  " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" + 
  // Touch-specific optimizations
  " touch-action-manipulation tap-highlight-transparent active:scale-[0.98]" +
  // Disabled states
  " disabled:pointer-events-none disabled:opacity-50" +
  // Icon handling
  " [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90",
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/90",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80",
      },
      size: {
        // Optimize sizes for touch targets (44px minimum height recommended)
        default: "h-11 sm:h-10 px-4 py-2 text-base sm:text-sm",
        sm: "h-10 sm:h-9 rounded-md px-3 py-1.5 text-sm",
        lg: "h-12 sm:h-11 rounded-md px-8 py-2.5 text-base",
        icon: "h-11 w-11 sm:h-10 sm:w-10 [&_svg]:size-5 sm:[&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps {
  className?: string;
  variant?: string;
  size?: string;
  asChild?: boolean;
  // Add a prop to force mobile optimizations even on desktop
  mobileOptimized?: boolean;
  // Basic button attributes
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  name?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onTouchCancel?: () => void;
  [key: string]: any; // Allow for other HTML button attributes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false,
    mobileOptimized = true, 
    ...props 
  }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const Comp = asChild ? Slot : "button"
    const isMobile = useIsMobile();
    
    // Track active/pressed state for better touch feedback
    const [isActive, setIsActive] = React.useState(false);
    
    // Use our reusable useTouch hook for consistent touch feedback
    const touchHandlers = useTouch({
      provideFeedback: true,
      feedbackDuration: 200,
      activeClass: "scale-[0.98] opacity-90",
      onlyOnMobile: !mobileOptimized, // If mobileOptimized is true, apply even on desktop
      onTouchStart: (e) => {
        setIsActive(true);
      },
      onTouchEnd: (e) => {
        setIsActive(false);
      }
    });
    
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          touchHandlers.className,
          mobileOptimized && "min-h-[44px] min-w-[44px]"
        )}
        ref={ref}
        // Add touch event handlers
        onTouchStart={touchHandlers.onTouchStart}
        onTouchEnd={touchHandlers.onTouchEnd}
        onTouchCancel={touchHandlers.onTouchCancel}
        // Ensure proper accessibility
        aria-pressed={isActive || undefined}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
