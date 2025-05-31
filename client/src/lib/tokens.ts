// Design Tokens - Centralized design system
// All UI patterns must use only these tokens - no inline styles allowed

// Enhanced Design System Tokens - Complete specification
export const designTokens = {
  color: {
    primary: {
      sage: '142 25% 51%',
      mediumForest: '142 20% 45%',
      darkSage: '142 20% 35%',
      forest: '142 23% 26%'
    },
    secondary: {
      mint: '142 23% 89%',
      lightMint: '142 23% 95%'
    },
    semantic: {
      success: '120 60% 50%',
      warning: '45 100% 60%',
      error: '0 84% 60%',
      info: '210 100% 60%'
    },
    background: {
      light: '142 23% 89%',
      dark: '142 23% 4%',
      surface: '0 0% 100%',
      surfaceDark: '0 0% 3%',
      overlay: '0 0% 0%'
    },
    text: {
      primaryLight: '142 23% 26%',
      primaryDark: '0 0% 98%',
      secondaryLight: '142 23% 40%',
      secondaryDark: '0 0% 85%',
      mutedLight: '142 10% 60%',
      mutedDark: '0 0% 65%'
    },
    border: {
      light: '142 20% 85%',
      dark: '142 20% 15%',
      focus: '142 25% 51%'
    }
  },
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px'
  },
  radius: {
    none: '0px',
    sm: '2px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px'
  },
  typography: {
    fontFamily: {
      primary: 'Raleway, system-ui, sans-serif',
      secondary: 'Hammersmith One, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace'
    },
    fontSize: {
      xs: { size: '0.75rem', lineHeight: '1rem' },
      sm: { size: '0.875rem', lineHeight: '1.25rem' },
      base: { size: '1rem', lineHeight: '1.5rem' },
      lg: { size: '1.125rem', lineHeight: '1.75rem' },
      xl: { size: '1.25rem', lineHeight: '1.75rem' },
      '2xl': { size: '1.5rem', lineHeight: '2rem' },
      '3xl': { size: '1.875rem', lineHeight: '2.25rem' },
      '4xl': { size: '2.25rem', lineHeight: '2.5rem' },
      '5xl': { size: '3rem', lineHeight: '1' },
      '6xl': { size: '3.75rem', lineHeight: '1' },
      '7xl': { size: '4.5rem', lineHeight: '1' },
      '8xl': { size: '6rem', lineHeight: '1' },
      '9xl': { size: '8rem', lineHeight: '1' }
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    }
  },
  elevation: {
    shadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: '0 0 #0000'
    },
    zIndex: {
      hide: '-1',
      auto: 'auto',
      base: '0',
      docked: '10',
      dropdown: '1000',
      sticky: '1100',
      banner: '1200',
      overlay: '1300',
      modal: '1400',
      popover: '1500',
      skipLink: '1600',
      toast: '1700',
      tooltip: '1800'
    }
  },
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  animation: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    spring: {
      gentle: { tension: 120, friction: 14 },
      wobbly: { tension: 180, friction: 12 },
      stiff: { tension: 210, friction: 20 },
      slow: { tension: 280, friction: 60 },
      molasses: { tension: 280, friction: 120 }
    }
  },
  motion: {
    reduce: 'prefers-reduced-motion: reduce',
    safe: 'prefers-reduced-motion: no-preference'
  }
} as const;

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  return `
    :root {
      /* Primary Colors */
      --color-sage: ${designTokens.color.primary.sage};
      --color-medium-forest: ${designTokens.color.primary.mediumForest};
      --color-dark-sage: ${designTokens.color.primary.darkSage};
      --color-forest: ${designTokens.color.primary.forest};
      
      /* Secondary Colors */
      --color-mint: ${designTokens.color.secondary.mint};
      --color-light-mint: ${designTokens.color.secondary.lightMint};
      
      /* Semantic Colors */
      --color-success: ${designTokens.color.semantic.success};
      --color-warning: ${designTokens.color.semantic.warning};
      --color-error: ${designTokens.color.semantic.error};
      --color-info: ${designTokens.color.semantic.info};
      
      /* Spacing */
      --space-xs: ${designTokens.spacing.xs};
      --space-sm: ${designTokens.spacing.sm};
      --space-md: ${designTokens.spacing.md};
      --space-lg: ${designTokens.spacing.lg};
      --space-xl: ${designTokens.spacing.xl};
      --space-2xl: ${designTokens.spacing['2xl']};
      --space-3xl: ${designTokens.spacing['3xl']};
      --space-4xl: ${designTokens.spacing['4xl']};
      
      /* Radius */
      --radius-sm: ${designTokens.radius.sm};
      --radius-md: ${designTokens.radius.md};
      --radius-lg: ${designTokens.radius.lg};
      
      /* Animation */
      --duration-fast: ${designTokens.animation.duration.fast};
      --duration-normal: ${designTokens.animation.duration.normal};
      --duration-slow: ${designTokens.animation.duration.slow};
    }
  `;
};