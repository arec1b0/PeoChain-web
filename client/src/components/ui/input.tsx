import React from "react"
import { cn } from "@/lib/utils"

// Define explicit props to work with the project's TypeScript configuration
type InputProps = {
  mobileOptimized?: boolean;
  className?: string;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number | readonly string[];
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  [key: string]: any; // For any other HTML input attributes
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    const { 
      className,
      type = "text",
      mobileOptimized = true,
      onFocus,
      onBlur,
      ...otherProps 
    } = props;
    
    // Handle focus state for better touch feedback
    const [isFocused, setIsFocused] = React.useState(false);
    
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md border border-input bg-background",
          // Base height and padding
          "h-10 px-3 py-2",
          // Optimized for mobile touch targets (44px is minimum recommended)
          mobileOptimized && "sm:h-11 md:h-10",
          // Text size handling for different devices
          "text-base sm:text-base md:text-sm",
          // Focus state styles
          "ring-offset-background",
          "transition-colors duration-200",
          // File input handling
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // Placeholder and state styles
          "placeholder:text-muted-foreground",
          // Improved focus handling for touch
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          // Add tap highlight color for mobile
          "touch-action-manipulation tap-highlight-transparent",
          // States
          "disabled:cursor-not-allowed disabled:opacity-50",
          // iOS Safari specific optimizations
          "appearance-none",
          // Apply custom class
          className
        )}
        ref={ref}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        // Add all remaining props
        {...otherProps}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
