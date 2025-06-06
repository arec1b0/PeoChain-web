// Modern Card Component - 2025 Design Standards
import React from "react";
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  glowEffect?: boolean;
}

const cardVariants = {
  default: "bg-white/95 backdrop-blur-sm border border-neutral-200/60 shadow-sm",
  elevated: "bg-white/95 backdrop-blur-sm border-0 shadow-lg shadow-black/[0.04]",
  outlined: "bg-transparent border-2 border-neutral-300/80 shadow-none",
  ghost: "bg-neutral-50/60 backdrop-blur-sm border-0 shadow-none",
};

const cardSizes = {
  sm: "p-4 rounded-lg",
  md: "p-6 rounded-xl", 
  lg: "p-8 rounded-2xl",
};

const interactiveStyles = "transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer";
const glowStyles = "relative before:absolute before:inset-0 before:rounded-inherit before:bg-gradient-to-r before:from-primary-500/20 before:to-accent-500/20 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100";

export function ModernCard({ 
  className, 
  variant = "default", 
  size = "md",
  interactive = false,
  glowEffect = false,
  children,
  ...props 
}: ModernCardProps) {
  const Component = interactive ? motion.div : "div";
  
  const motionProps: MotionProps = interactive ? {
    whileHover: { y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 30 }
  } : {};

  return (
    <Component
      className={cn(
        "relative overflow-hidden", // Base styles
        cardVariants[variant],
        cardSizes[size],
        interactive && interactiveStyles,
        glowEffect && glowStyles,
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

// Card content components with proper semantic structure
export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 
      className={cn("text-lg font-semibold leading-none tracking-tight", className)} 
      {...props} 
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p 
      className={cn("text-sm text-muted-foreground leading-relaxed", className)} 
      {...props} 
    />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pt-0", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center pt-6", className)} {...props} />
  );
}