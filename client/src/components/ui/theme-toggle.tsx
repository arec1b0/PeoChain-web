import { memo, useCallback } from 'react';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useThemeContext, Theme } from '@/components/ui/theme-provider';
import { useKeyboardNavigation } from '@/hooks/use-accessibility';

interface ThemeToggleProps {
  readonly variant?: 'button' | 'dropdown';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showLabel?: boolean;
  readonly className?: string;
}

const themeConfig = {
  light: {
    icon: Sun,
    label: 'Light mode',
    description: 'Use light theme'
  },
  dark: {
    icon: Moon,
    label: 'Dark mode', 
    description: 'Use dark theme'
  },
  system: {
    icon: Monitor,
    label: 'System mode',
    description: 'Use system preference'
  }
} as const;

const ThemeToggleButton = memo<{
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showLabel?: boolean;
  readonly className?: string;
}>(({ size = 'md', showLabel = false, className }) => {
  const { theme, resolvedTheme, toggleTheme } = useThemeContext();
  
  const { onKeyDown } = useKeyboardNavigation(toggleTheme);
  
  const currentConfig = themeConfig[theme === 'system' ? resolvedTheme : theme];
  const IconComponent = currentConfig.icon;
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9', 
    lg: 'h-10 w-10'
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      onKeyDown={onKeyDown}
      className={`${sizeClasses[size]} transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-sage focus:ring-offset-2 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode. Current: ${currentConfig.label}`}
      title={currentConfig.description}
    >
      <IconComponent className="h-4 w-4 transition-transform duration-300" />
      {showLabel && (
        <span className="sr-only">{currentConfig.label}</span>
      )}
    </Button>
  );
});

ThemeToggleButton.displayName = 'ThemeToggleButton';

const ThemeToggleDropdown = memo<{
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
}>(({ size = 'md', className }) => {
  const { theme, setTheme } = useThemeContext();
  
  const handleThemeSelect = useCallback((selectedTheme: Theme) => {
    setTheme(selectedTheme);
  }, [setTheme]);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`${sizeClasses[size]} transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-sage focus:ring-offset-2 ${className}`}
          aria-label="Select theme"
        >
          <Palette className="h-4 w-4" />
          <span className="sr-only">Toggle theme menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-32">
        {Object.entries(themeConfig).map(([themeKey, config]) => {
          const IconComponent = config.icon;
          const isSelected = theme === themeKey;
          
          return (
            <DropdownMenuItem
              key={themeKey}
              onClick={() => handleThemeSelect(themeKey as Theme)}
              className={`cursor-pointer ${isSelected ? 'bg-accent' : ''}`}
              aria-label={config.description}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              <span>{config.label}</span>
              {isSelected && (
                <span className="ml-auto text-xs text-muted-foreground">✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

ThemeToggleDropdown.displayName = 'ThemeToggleDropdown';

const ThemeToggle = memo<ThemeToggleProps>(({ 
  variant = 'button', 
  size = 'md',
  showLabel = false,
  className 
}) => {
  if (variant === 'dropdown') {
    return <ThemeToggleDropdown size={size} className={className} />;
  }
  
  return (
    <ThemeToggleButton 
      size={size} 
      showLabel={showLabel} 
      className={className} 
    />
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export { ThemeToggle };