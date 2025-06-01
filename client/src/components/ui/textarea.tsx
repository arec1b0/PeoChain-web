import React from "react"
import { cn } from "@/lib/utils"
import { useIsMobile, useTouch } from "@/hooks"

// Define explicit props to work with the project's TypeScript configuration
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  props: TextareaProps,
  ref: React.Ref<HTMLTextAreaElement>
) {
  const {
    className,
    mobileOptimized = true,
    onFocus,
    onBlur,
    ...otherProps
  } = props;
    const isMobile = useIsMobile();
    const [isFocused, setIsFocused] = React.useState(false);
    
    const touchHandlers = useTouch({
      provideFeedback: true,
      feedbackDuration: 100,
      onlyOnMobile: true
    });

    return (
      <textarea
        className={cn(
          // Base styles
          "flex min-h-[80px] w-full rounded-md border border-input bg-background",
          // Padding and text size
          "px-3 py-2 text-base",
          // Larger touch-friendly sizing on mobile
          mobileOptimized && isMobile && "py-3 text-base leading-relaxed",
          // Focus and accessibility
          "ring-offset-background",
          "transition-colors duration-200",
          // States
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Mobile touch optimizations
          "touch-action-manipulation tap-highlight-transparent",
          // Make text size responsive
          "sm:text-base md:text-sm",
          // iOS Safari specific optimizations
          "appearance-none",
          // Apply custom class
          className,
          // Apply touch class
          touchHandlers.className
        )}
        onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        // Add touch handlers for mobile
        onTouchStart={mobileOptimized ? touchHandlers.onTouchStart : undefined}
        onTouchEnd={mobileOptimized ? touchHandlers.onTouchEnd : undefined}
        onTouchCancel={mobileOptimized ? touchHandlers.onTouchCancel : undefined}
        ref={ref}
        {...otherProps}
      />
    );
})
Textarea.displayName = "Textarea"

export { Textarea, type TextareaProps }
