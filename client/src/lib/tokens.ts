// Design Tokens - Centralized design system
// All UI patterns must use only these tokens - no inline styles allowed

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
      dark: '142 23% 4%'
    },
    text: {
      primaryLight: '142 23% 26%',
      primaryDark: '0 0% 98%',
      secondaryLight: '142 23% 40%',
      secondaryDark: '0 0% 85%'
    }
  },
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px'
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  typography: {
    fontFamily: {
      primary: 'Raleway, sans-serif',
      secondary: 'Hammersmith One, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    }
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