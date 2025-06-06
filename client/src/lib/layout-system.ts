// Modern Layout System - Container Queries & Fluid Grid
export const layoutSystem = {
  // Fluid spacing system based on viewport and container
  spacing: {
    // Fluid spacing using clamp() for responsive design
    xs: "clamp(0.25rem, 1vw, 0.5rem)",   // 4px → 8px
    sm: "clamp(0.5rem, 1.5vw, 1rem)",    // 8px → 16px
    md: "clamp(1rem, 2.5vw, 1.5rem)",    // 16px → 24px
    lg: "clamp(1.5rem, 4vw, 3rem)",      // 24px → 48px
    xl: "clamp(2rem, 6vw, 4rem)",        // 32px → 64px
    xxl: "clamp(3rem, 8vw, 6rem)",       // 48px → 96px
  },
  
  // Container system with proper content widths
  containers: {
    content: "min(65ch, 100% - 2rem)",     // Optimal reading length
    prose: "min(75ch, 100% - 2rem)",       // Longer form content
    grid: "min(1280px, 100% - 2rem)",      // Grid layouts
    wide: "min(1440px, 100% - 2rem)",      // Full-width sections
    full: "100%",                          // Edge-to-edge
  },
  
  // Responsive grid system
  grid: {
    // Auto-fit grid for flexible layouts
    autoFit: "repeat(auto-fit, minmax(280px, 1fr))",
    autoFill: "repeat(auto-fill, minmax(320px, 1fr))",
    
    // Fixed column grids with proper gaps
    columns: {
      1: "1fr",
      2: "repeat(2, 1fr)",
      3: "repeat(3, 1fr)",
      4: "repeat(4, 1fr)",
      responsive: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
    },
    
    // Semantic gaps
    gaps: {
      tight: "clamp(0.5rem, 2vw, 1rem)",
      normal: "clamp(1rem, 3vw, 1.5rem)",
      loose: "clamp(1.5rem, 4vw, 2.5rem)",
    }
  },
  
  // Modern card layouts
  cards: {
    // Intrinsic sizing for flexible card layouts
    stack: "display: grid; gap: var(--space-md);",
    cluster: "display: flex; flex-wrap: wrap; gap: var(--space-md);",
    grid: "display: grid; grid-template-columns: var(--grid-responsive); gap: var(--grid-gap-normal);",
  },
  
  // Section spacing for visual rhythm
  sections: {
    paddingBlock: "clamp(3rem, 8vw, 6rem)",
    paddingInline: "clamp(1rem, 4vw, 2rem)",
    gap: "clamp(2rem, 6vw, 4rem)",
  }
} as const;

// Utility classes for common layouts
export const layoutClasses = {
  // Content containers
  contentContainer: "mx-auto px-4 sm:px-6 lg:px-8",
  proseContainer: "mx-auto max-w-prose px-4",
  gridContainer: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  
  // Flex utilities
  flexCenter: "flex items-center justify-center",
  flexBetween: "flex items-center justify-between",
  flexColumn: "flex flex-col",
  
  // Grid utilities
  autoGrid: "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6",
  cardGrid: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
  
  // Stack layouts
  stack: "flex flex-col gap-4",
  stackLg: "flex flex-col gap-8",
} as const;