import React from "react";
import { cn } from "@/lib/utils";

// Enhanced Container System
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "narrow" | "default" | "wide" | "prose" | "full";
  fluid?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ variant = "default", fluid = false, className, children, ...props }, ref) => {
    const containerVariants = {
      narrow: "max-w-2xl",
      default: "max-w-4xl", 
      wide: "max-w-6xl",
      prose: "max-w-prose",
      full: "max-w-none"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto px-4 sm:px-6 lg:px-8",
          !fluid && containerVariants[variant],
          fluid && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

// Enhanced Grid System
interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12 | "auto-fit" | "auto-fill";
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  responsive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols = "auto-fit", gap = "md", responsive = true, className, children, ...props }, ref) => {
    const getGridCols = () => {
      if (cols === "auto-fit") return "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]";
      if (cols === "auto-fill") return "grid-cols-[repeat(auto-fill,minmax(320px,1fr))]";
      return `grid-cols-1 ${responsive ? `sm:grid-cols-2 lg:grid-cols-${cols}` : `grid-cols-${cols}`}`;
    };

    const gapClasses = {
      xs: "gap-fluid-xs",
      sm: "gap-fluid-sm", 
      md: "gap-fluid-md",
      lg: "gap-fluid-lg",
      xl: "gap-fluid-xl",
      "2xl": "gap-fluid-2xl"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          getGridCols(),
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Grid.displayName = "Grid";

// Enhanced Stack System
interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ 
    direction = "vertical", 
    spacing = "md", 
    align = "stretch",
    justify = "start",
    wrap = false,
    className, 
    children, 
    ...props 
  }, ref) => {
    const spacingClasses = {
      vertical: {
        xs: "space-y-fluid-xs",
        sm: "space-y-fluid-sm",
        md: "space-y-fluid-md", 
        lg: "space-y-fluid-lg",
        xl: "space-y-fluid-xl",
        "2xl": "space-y-fluid-2xl"
      },
      horizontal: {
        xs: "gap-fluid-xs",
        sm: "gap-fluid-sm",
        md: "gap-fluid-md",
        lg: "gap-fluid-lg", 
        xl: "gap-fluid-xl",
        "2xl": "gap-fluid-2xl"
      }
    };

    const alignClasses = {
      start: direction === "vertical" ? "items-start" : "justify-start",
      center: direction === "vertical" ? "items-center" : "justify-center", 
      end: direction === "vertical" ? "items-end" : "justify-end",
      stretch: direction === "vertical" ? "items-stretch" : "justify-stretch"
    };

    const justifyClasses = {
      start: direction === "vertical" ? "justify-start" : "items-start",
      center: direction === "vertical" ? "justify-center" : "items-center",
      end: direction === "vertical" ? "justify-end" : "items-end", 
      between: direction === "vertical" ? "justify-between" : "items-between",
      around: direction === "vertical" ? "justify-around" : "items-around",
      evenly: direction === "vertical" ? "justify-evenly" : "items-evenly"
    };

    return (
      <div
        ref={ref}
        className={cn(
          direction === "vertical" ? "flex flex-col" : "flex flex-row",
          direction === "vertical" 
            ? spacingClasses.vertical[spacing]
            : `${spacingClasses.horizontal[spacing]} flex`,
          alignClasses[align],
          justifyClasses[justify],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Stack.displayName = "Stack";

// Enhanced Section Component
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  background?: "default" | "muted" | "accent" | "primary";
  container?: boolean;
  containerVariant?: "narrow" | "default" | "wide" | "prose" | "full";
  className?: string;
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    spacing = "lg", 
    background = "default",
    container = true,
    containerVariant = "default",
    className, 
    children, 
    ...props 
  }, ref) => {
    const spacingClasses = {
      xs: "py-8",
      sm: "py-12",
      md: "py-16",
      lg: "py-20 sm:py-24",
      xl: "py-24 sm:py-32",
      "2xl": "py-32 sm:py-40"
    };

    const backgroundClasses = {
      default: "bg-background",
      muted: "bg-muted/30",
      accent: "bg-accent/5",
      primary: "bg-primary/5"
    };

    const content = container ? (
      <Container variant={containerVariant}>
        {children}
      </Container>
    ) : children;

    return (
      <section
        ref={ref}
        className={cn(
          spacingClasses[spacing],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);
Section.displayName = "Section";

// Enhanced Card with proper elevation
interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ elevation = "sm", interactive = false, padding = "md", className, children, ...props }, ref) => {
    const elevationClasses = {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl"
    };

    const paddingClasses = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-card text-card-foreground border border-border/50",
          elevationClasses[elevation],
          paddingClasses[padding],
          interactive && "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
          "touch-target",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EnhancedCard.displayName = "EnhancedCard";