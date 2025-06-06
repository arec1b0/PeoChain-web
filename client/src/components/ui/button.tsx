import React from "react";
import { useTouch, useIsMobile } from "@/hooks";

// Create type definitions since we can't import modules directly
type SlotProps = { children?: React.ReactNode };
const Slot: React.FC<SlotProps> = ({ children }: SlotProps) =>
  children as React.ReactElement;

// Simplified CVA implementation for our use case
type VariantConfig = Record<string, Record<string, string>>;
type DefaultVariants = Record<string, string>;

interface VariantOptions {
  className?: string;
  variant?: string;
  size?: string;
  [key: string]: string | undefined;
}

const cva = (
  base: string,
  config: { variants: VariantConfig; defaultVariants: DefaultVariants },
) => {
  return (options: VariantOptions = {}) => {
    const { className = "", ...variants } = options || {};
    const variantClassNames = Object.entries(variants).map(
      ([variant, value]) => {
        if (!value || !config.variants[variant]) return "";
        return config.variants[variant][value] || "";
      },
    );
    return [base, ...variantClassNames, className].filter(Boolean).join(" ");
  };
};

type VariantProps<T> = {
  variant?: string;
  size?: string;
};

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Enhanced base styles with WCAG 2.2 compliance
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium" +
    " transition-all duration-200 ease-out" +
    // Enhanced focus handling for better accessibility
    " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" +
    // Touch optimizations for mobile
    " touch-action-manipulation tap-highlight-transparent active:scale-[0.98]" +
    // Improved disabled states
    " disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed" +
    // Icon and loading state handling
    " [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform" +
    // Ensure minimum touch targets
    " touch-target",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md active:bg-primary/95 active:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary/20 hover:bg-secondary/80 active:bg-secondary/90",
        outline:
          "border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 active:bg-primary/10",
        ghost:
          "hover:bg-primary/10 active:bg-primary/20 text-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md active:bg-destructive/95",
        success:
          "bg-success text-success-foreground shadow-sm hover:bg-success/90 hover:shadow-md active:bg-success/95",
        warning:
          "bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 hover:shadow-md active:bg-warning/95",
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80 p-0 h-auto",
      },
      size: {
        // Mobile-first sizing with proper touch targets
        sm: "h-10 px-3 text-fluid-sm font-medium",
        default: "h-11 px-4 text-fluid-base font-medium",
        lg: "h-12 px-6 text-fluid-lg font-semibold",
        xl: "h-14 px-8 text-fluid-xl font-semibold",
        icon: "h-11 w-11 [&_svg]:size-5",
        "icon-sm": "h-9 w-9 [&_svg]:size-4",
        "icon-lg": "h-12 w-12 [&_svg]:size-6",
      },
      loading: {
        true: "cursor-wait [&_svg]:animate-spin",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      loading: false,
    },
  },
);

export interface ButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning" | "link";
  size?: "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
  asChild?: boolean;
  loading?: boolean;
  // Enhanced accessibility props
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean;
  // Basic button attributes
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  name?: string;
  id?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  // Touch event handlers
  onTouchStart?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  onTouchCancel?: (event: React.TouchEvent<HTMLButtonElement>) => void;
  // Focus event handlers
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  // Loading state with icon
  loadingText?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      mobileOptimized = true,
      ...props
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const Comp = asChild ? Slot : "button";
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
      },
    });

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          touchHandlers.className,
          mobileOptimized && "min-h-[44px] min-w-[44px]",
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
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
