import { createContext, useContext, ReactNode, memo } from 'react';
import { useTheme, Theme, ResolvedTheme } from '@/hooks/use-theme';

interface ThemeProviderContextValue {
  readonly theme: Theme;
  readonly resolvedTheme: ResolvedTheme;
  readonly setTheme: (theme: Theme) => void;
  readonly toggleTheme: () => void;
  readonly systemTheme: ResolvedTheme;
  readonly isTransitioning: boolean;
}

const ThemeProviderContext = createContext<ThemeProviderContextValue | undefined>(undefined);

interface ThemeProviderProps {
  readonly children: ReactNode;
  readonly defaultTheme?: Theme;
  readonly enableSystem?: boolean;
  readonly storageKey?: string;
  readonly attribute?: string;
  readonly enableColorScheme?: boolean;
}

const ThemeProvider = memo<ThemeProviderProps>(({ 
  children, 
  defaultTheme = 'system',
  enableSystem = true,
  storageKey = 'peochain-theme',
  attribute = 'class',
  enableColorScheme = true
}) => {
  const themeValue = useTheme({
    defaultTheme,
    enableSystem,
    storageKey,
    attribute,
    enableColorScheme
  });

  return (
    <ThemeProviderContext.Provider value={themeValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';

export function useThemeContext(): ThemeProviderContextValue {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
}

export { ThemeProvider };