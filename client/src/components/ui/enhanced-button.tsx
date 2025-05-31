import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"
import { designTokens } from "@/lib/tokens"
import { standardAnimations, transitionPresets } from "@/lib/animations"
import { useUIStore } from "@/store"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        sage: "bg-sage text-white hover:bg-medium-forest",
        mint: "bg-mint text-forest hover:bg-light-mint"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      },
      animation: {
        none: "",
        subtle: "transition-all duration-200 ease-out",
        bounce: "transition-all duration-300 ease-bounce",
        scale: "hover:scale-105 active:scale-95 transition-transform"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "subtle"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    Omit<MotionProps, 'children'> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  reducedMotion?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    animation,
    asChild = false, 
    loading = false,
    loadingText,
    icon,
    iconPosition = 'left',
    reducedMotion = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const { setLoading } = useUIStore()
    const Comp = asChild ? Slot : motion.button
    
    const isDisabled = disabled || loading
    
    // Animation variants based on reduced motion preference
    const animationVariants = React.useMemo(() => {
      if (reducedMotion || animation === 'none') {
        return {}
      }
      
      switch (animation) {
        case 'bounce':
          return {
            ...standardAnimations.buttonHover,
            transition: transitionPresets.bouncy
          }
        case 'scale':
          return {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            transition: transitionPresets.fast
          }
        default:
          return {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: transitionPresets.fast
          }
      }
    }, [animation, reducedMotion])

    const handleClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) {
        event.preventDefault()
        return
      }
      
      props.onClick?.(event)
    }, [loading, props.onClick])

    const renderContent = () => {
      if (loading) {
        return (
          <div className="flex items-center gap-2">
            <motion.div
              className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              variants={standardAnimations.spinner}
              animate="animate"
            />
            {loadingText || children}
          </div>
        )
      }

      if (icon) {
        return (
          <div className="flex items-center gap-2">
            {iconPosition === 'left' && icon}
            {children}
            {iconPosition === 'right' && icon}
          </div>
        )
      }

      return children
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        disabled={isDisabled}
        onClick={handleClick}
        {...animationVariants}
        {...props}
      >
        {renderContent()}
      </Comp>
    )
  }
)
EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, buttonVariants }