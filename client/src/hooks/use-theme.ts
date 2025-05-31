import { useEffect, useState, useCallback, useMemo } from 'react';
import { useReducedMotion } from '@/hooks/use-accessibility';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeConfig {
  readonly defaultTheme: Theme;
  readonly enableSystem: boolean;
  readonly storageKey: string;
  readonly attribute: string;
  readonly enableColorScheme: boolean;
}

interface ThemeContextValue {
  readonly theme: Theme;
  readonly resolvedTheme: ResolvedTheme;
  readonly setTheme: (theme: Theme) => void;
  readonly toggleTheme: () => void;
  readonly systemTheme: ResolvedTheme;
  readonly isTransitioning: boolean;
}

const DEFAULT_CONFIG: ThemeConfig = {
  defaultTheme: 'system',
  enableSystem: true,
  storageKey: 'peochain-theme',
  attribute: 'class',
  enableColorScheme: true
} as const;

export function useTheme(config: Partial<ThemeConfig> = {}): ThemeContextValue {
  const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  const prefersReducedMotion = useReducedMotion();
  
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return finalConfig.defaultTheme;
    
    try {
      const stored = localStorage.getItem(finalConfig.storageKey);
      return (stored as Theme) || finalConfig.defaultTheme;
    } catch {
      return finalConfig.defaultTheme;
    }
  });

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    return theme === 'system' ? systemTheme : theme;
  }, [theme, systemTheme]);

  // Monitor system theme changes
  useEffect(() => {
    if (!finalConfig.enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [finalConfig.enableSystem]);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const isDark = resolvedTheme === 'dark';

    // Add transition class if not reduced motion
    if (!prefersReducedMotion) {
      setIsTransitioning(true);
      root.classList.add('theme-transitioning');
    }

    // Apply theme
    if (finalConfig.attribute === 'class') {
      root.classList.toggle('dark', isDark);
      root.classList.toggle('light', !isDark);
    } else {
      root.setAttribute(finalConfig.attribute, resolvedTheme);
    }

    // Apply color scheme
    if (finalConfig.enableColorScheme) {
      root.style.colorScheme = resolvedTheme;
    }

    // Remove transition class after animation
    if (!prefersReducedMotion) {
      const timeout = setTimeout(() => {
        root.classList.remove('theme-transitioning');
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [resolvedTheme, finalConfig, prefersReducedMotion]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    try {
      if (newTheme === finalConfig.defaultTheme) {
        localStorage.removeItem(finalConfig.storageKey);
      } else {
        localStorage.setItem(finalConfig.storageKey, newTheme);
      }
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [finalConfig.defaultTheme, finalConfig.storageKey]);

  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }, [theme, systemTheme, setTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    systemTheme,
    isTransitioning
  } as const;
}