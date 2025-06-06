// Modern Typography System - 2025 Standards
export const typography = {
  // Fluid typography using clamp() for responsive scaling
  heading: {
    h1: "clamp(2.5rem, 4vw, 4rem)", // 40px → 64px
    h2: "clamp(2rem, 3.5vw, 3rem)", // 32px → 48px
    h3: "clamp(1.5rem, 2.5vw, 2rem)", // 24px → 32px
    h4: "clamp(1.25rem, 2vw, 1.5rem)", // 20px → 24px
  },
  body: {
    large: "clamp(1.125rem, 1.5vw, 1.25rem)", // 18px → 20px
    base: "clamp(1rem, 1vw, 1.125rem)", // 16px → 18px
    small: "clamp(0.875rem, 0.8vw, 1rem)", // 14px → 16px
    tiny: "0.75rem", // 12px fixed
  },
  // Optimal line heights for readability
  lineHeight: {
    tight: "1.25",
    normal: "1.5", 
    relaxed: "1.75",
  },
  // Letter spacing for improved readability
  letterSpacing: {
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
  },
  // Font weights with semantic naming
  weight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  }
} as const;

// Typography component utilities
export const getTypographyClass = (variant: keyof typeof typography.heading | keyof typeof typography.body) => {
  const isHeading = variant in typography.heading;
  const size = isHeading 
    ? typography.heading[variant as keyof typeof typography.heading]
    : typography.body[variant as keyof typeof typography.body];
    
  return `text-[${size}] leading-${isHeading ? 'tight' : 'normal'} tracking-${isHeading ? 'tight' : 'normal'}`;
};