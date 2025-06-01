import React from "react"
import { cn } from "@/lib/utils"
import { useTouch } from "@/hooks"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to optimize the card for mobile touch targets
   */
  mobileOptimized?: boolean;
  
  /**
   * CSS class names to apply to the card
   */
  className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, mobileOptimized = true, ...props }: CardProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        mobileOptimized && "touch-action-manipulation tap-highlight-transparent",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

interface TouchableCardProps extends CardProps {
  /**
   * Whether to provide visual feedback when touched
   */
  provideFeedback?: boolean;
  
  /**
   * Duration in ms to keep the touch active state after touch end
   */
  feedbackDuration?: number;
  
  /**
   * Custom handler for touch start
   */
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  
  /**
   * Custom handler for touch end
   */
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
  
  /**
   * Role for accessibility
   */
  role?: string;
  
  /**
   * Whether the card is clickable/actionable
   */
  actionable?: boolean;
}

/**
 * A card component optimized for touch interactions on mobile devices
 */
const TouchableCard = React.forwardRef<HTMLDivElement, TouchableCardProps>(
  ({
    className,
    mobileOptimized = true,
    provideFeedback = true,
    feedbackDuration = 150,
    onTouchStart,
    onTouchEnd,
    role = "button",
    actionable = true,
    ...props
  }: TouchableCardProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const touchHandlers = useTouch({
      provideFeedback,
      feedbackDuration,
      onTouchStart,
      onTouchEnd,
      activeClass: "touch-active"
    });
    
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          "transition-all duration-200",
          mobileOptimized && "touch-action-manipulation tap-highlight-transparent",
          provideFeedback && "active:scale-[0.98] active:shadow-sm",
          touchHandlers.activeClass && "scale-[0.98] shadow-sm opacity-90",
          actionable && "cursor-pointer",
          className
        )}
        role={actionable ? role : undefined}
        tabIndex={actionable ? 0 : undefined}
        aria-pressed={touchHandlers.ariaPressed}
        onTouchStart={touchHandlers.onTouchStart}
        onTouchEnd={touchHandlers.onTouchEnd}
        onTouchCancel={touchHandlers.onTouchCancel}
        {...props}
      />
    );
  }
);
TouchableCard.displayName = "TouchableCard"

// Define interfaces for all card subcomponents for type safety
interface CardComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * CSS class names to apply to the component
   */
  className?: string;
  
  /**
   * Whether to optimize for mobile touch targets
   */
  mobileOptimized?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, mobileOptimized = true, ...props }: CardComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6", 
      mobileOptimized && "touch-action-manipulation tap-highlight-transparent",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, mobileOptimized = true, ...props }: CardComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      mobileOptimized && "text-xl sm:text-2xl touch-action-manipulation tap-highlight-transparent",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, mobileOptimized = true, ...props }: CardComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground", 
      mobileOptimized && "text-base sm:text-sm touch-action-manipulation tap-highlight-transparent",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, mobileOptimized = true, ...props }: CardComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div 
    ref={ref} 
    className={cn(
      "p-6 pt-0", 
      mobileOptimized && "p-5 sm:p-6 pt-0 touch-action-manipulation tap-highlight-transparent",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardComponentProps>(
  ({ className, mobileOptimized = true, ...props }: CardComponentProps, ref: React.ForwardedRef<HTMLDivElement>) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0", 
      mobileOptimized && "p-5 sm:p-6 pt-0 gap-3 sm:gap-4 touch-action-manipulation tap-highlight-transparent",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  TouchableCard,
  // Export types for consumers
  type CardProps,
  type TouchableCardProps,
  type CardComponentProps
}
