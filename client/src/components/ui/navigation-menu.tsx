import React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile, useTouch } from "@/hooks"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

interface NavigationMenuTriggerProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
  /**
   * Child elements to render inside the trigger
   */
  children?: React.ReactNode;
}

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  NavigationMenuTriggerProps
>(({ className, children, mobileOptimized = true, ...props }: NavigationMenuTriggerProps, ref: React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Trigger>>) => {
  const isMobile = useIsMobile();
  const touchHandlers = useTouch({
    provideFeedback: true,
    feedbackDuration: 150,
    onlyOnMobile: true,
    activeClass: "scale-[0.98] opacity-90"
  });
  
  // Only add touch handlers if we're on mobile and want mobile optimization
  const mobileProps = (mobileOptimized && isMobile) ? {
    onTouchStart: touchHandlers.onTouchStart,
    onTouchEnd: touchHandlers.onTouchEnd,
    onTouchCancel: touchHandlers.onTouchCancel,
    className: touchHandlers.className
  } : {};
  
  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle(), 
        "group", 
        // Mobile optimizations
        mobileOptimized && isMobile && [
          "min-h-[44px] min-w-[44px]", // Minimum touch target size
          "text-base sm:text-sm",      // Larger text on mobile
          "px-4 py-3 sm:px-4 sm:py-2", // Larger padding on mobile
          "touch-action-manipulation tap-highlight-transparent"
        ],
        className
      )}
      aria-haspopup="true"
      {...mobileProps}
      {...props}
    >
      {children}{" "}
      <ChevronDown
        className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  );
})
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

interface NavigationMenuContentProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
  /**
   * Child elements to render inside the content
   */
  children?: React.ReactNode;
}

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  NavigationMenuContentProps
>(({ className, mobileOptimized = true, ...props }: NavigationMenuContentProps, ref: React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Content>>) => {
  const isMobile = useIsMobile();
  
  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      className={cn(
        "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
        // Mobile optimizations
        mobileOptimized && isMobile && [
          "p-4 sm:p-2",  // More padding on mobile for better touch targets
          "max-h-[85vh] overflow-auto", // Limit height on mobile and enable scrolling
          "touch-action-manipulation tap-highlight-transparent", // Better touch handling
          "rounded-md shadow-lg" // Better visual separation on mobile
        ],
        className
      )}
      {...props}
    />
  );
})
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

// Create a mobile-optimized NavigationMenuLink
interface NavigationMenuLinkProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
  /**
   * Child elements to render inside the link
   */
  children?: React.ReactNode;
}

const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ className, mobileOptimized = true, ...props }: NavigationMenuLinkProps, ref: React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Link>>) => {
  const isMobile = useIsMobile();
  const touchHandlers = useTouch({
    provideFeedback: true,
    feedbackDuration: 150,
    onlyOnMobile: true,
    activeClass: "scale-[0.98] opacity-90"
  });
  
  // Only add touch handlers if we're on mobile and want mobile optimization
  const mobileProps = (mobileOptimized && isMobile) ? {
    onTouchStart: touchHandlers.onTouchStart,
    onTouchEnd: touchHandlers.onTouchEnd,
    onTouchCancel: touchHandlers.onTouchCancel,
    className: touchHandlers.className
  } : {};
  
  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      className={cn(
        // Mobile optimizations
        mobileOptimized && isMobile && [
          "min-h-[44px] min-w-[44px]", // Minimum touch target size
          "text-base sm:text-sm",      // Larger text on mobile
          "py-3 px-4 sm:py-2 sm:px-3", // Larger padding on mobile
          "touch-action-manipulation tap-highlight-transparent",
          "block w-full" // Full width on mobile for easier tapping
        ],
        className
      )}
      {...mobileProps}
      {...props}
    />
  );
});

NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName

interface NavigationMenuViewportProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
}

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  NavigationMenuViewportProps
>(({ className, mobileOptimized = true, ...props }: NavigationMenuViewportProps, ref: React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Viewport>>) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "absolute left-0 top-full flex justify-center",
      // On mobile, make it full width for better touch targets
      mobileOptimized && isMobile && "w-full"
    )}>
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
          // Mobile optimizations
          mobileOptimized && isMobile && [
            "max-h-[80vh]", // Limit height on mobile
            "w-[95vw]", // Almost full width on mobile
            "p-4", // More padding for touch targets
            "touch-action-manipulation", // Better touch handling
            "shadow-xl" // Stronger shadow for better visual separation
          ],
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
})
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

interface NavigationMenuIndicatorProps extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> {
  /**
   * Whether to optimize for mobile devices
   */
  mobileOptimized?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
}

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  NavigationMenuIndicatorProps
>(({ className, mobileOptimized = true, ...props }: NavigationMenuIndicatorProps, ref: React.Ref<React.ElementRef<typeof NavigationMenuPrimitive.Indicator>>) => {
  const isMobile = useIsMobile();
  
  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
        // Mobile optimizations
        mobileOptimized && isMobile && [
          "h-2", // Slightly larger indicator on mobile
          "transition-all duration-200" // Smoother transitions
        ],
        className
      )}
      {...props}
    >
      <div className={cn(
        "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md",
        // Mobile optimizations
        mobileOptimized && isMobile && [
          "h-3 w-3", // Larger indicator triangle on mobile
          "shadow-lg" // Stronger shadow for better visibility
        ]
      )} />
    </NavigationMenuPrimitive.Indicator>
  );
})
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
