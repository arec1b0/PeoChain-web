# PeoChain Design System Documentation

## Overview

Comprehensive design system implementation with advanced state management, accessibility-first animations, and complete TypeScript coverage.

## Design Tokens

### Color System

All colors use HSL format for maximum flexibility and theming capability:

```typescript
// Primary Brand Colors
sage: "142 25% 51%"; // Main brand color
mediumForest: "142 20% 45%"; // Hover states
darkSage: "142 20% 35%"; // Active states
forest: "142 23% 26%"; // Text on light backgrounds

// Secondary Colors
mint: "142 23% 89%"; // Light accent
lightMint: "142 23% 95%"; // Subtle backgrounds
```

### Typography Scale

Font sizes with corresponding line heights for optimal readability:

```typescript
xs: { size: '0.75rem', lineHeight: '1rem' }     // 12px / 16px
sm: { size: '0.875rem', lineHeight: '1.25rem' }  // 14px / 20px
base: { size: '1rem', lineHeight: '1.5rem' }     // 16px / 24px
lg: { size: '1.125rem', lineHeight: '1.75rem' }  // 18px / 28px
// ... up to 9xl for display text
```

### Spacing System

Consistent spacing scale based on 4px grid:

```typescript
px: '1px'    // Borders
1: '4px'     // Minimal spacing
2: '8px'     // Small spacing
4: '16px'    // Base unit
8: '32px'    // Section spacing
// ... up to 96: '384px' for layout
```

### Elevation & Shadows

Layered shadow system for depth hierarchy:

```typescript
sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)"; // Subtle
md: "0 4px 6px -1px rgb(0 0 0 / 0.1)..."; // Default
lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)..."; // Prominent
xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)..."; // Modal/dropdown
```

### Z-Index Scale

Predictable layering system:

```typescript
dropdown: "1000"; // Dropdowns
modal: "1400"; // Modals
popover: "1500"; // Popovers
toast: "1700"; // Notifications
tooltip: "1800"; // Tooltips (highest)
```

## State Management Architecture

### Store Structure

Three specialized stores for optimal performance:

1. **UI Store** - Local interface state

   - Theme preferences
   - Modal/sidebar states
   - Loading indicators
   - Error states
   - Notifications

2. **App Store** - Global application state (persisted)

   - User data
   - Preferences
   - Network statistics
   - Cache management

3. **Animation Store** - Motion and transition state
   - Reduced motion preferences
   - Active transitions
   - Page transition state

### Type Safety

- Complete TypeScript coverage
- Strict mode enabled
- No implicit any types
- Readonly interfaces for immutability

```typescript
interface Notification {
  readonly id: string;
  readonly type: "success" | "error" | "warning" | "info";
  readonly title: string;
  readonly message: string;
  readonly timestamp: number;
}
```

## Animation System

### Performance Optimized

- Hardware acceleration for transforms
- Respect for `prefers-reduced-motion`
- 60fps target for all animations
- Batched DOM updates

### Animation Variants

Standardized animation patterns:

```typescript
// Page transitions
pageEnter: {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

// Micro-interactions
buttonHover: {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}
```

### Accessibility

- Automatic fallbacks for reduced motion
- ARIA live regions for dynamic content
- Focus management for modal transitions
- Screen reader announcements

## Component Architecture

### Enhanced Components

All components include:

- Design token integration
- Animation support
- Accessibility features
- Loading states
- Error boundaries

### Example: Enhanced Button

```typescript
<EnhancedButton
  variant="sage"
  size="lg"
  animation="bounce"
  loading={isSubmitting}
  loadingText="Processing..."
  icon={<CheckIcon />}
  iconPosition="left"
>
  Submit Form
</EnhancedButton>
```

## Implementation Standards

### Performance Requirements

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

### Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion respect

### Code Quality

- 100% TypeScript strict mode
- ESLint configuration enforced
- Automated accessibility testing
- Performance monitoring
- Bundle size monitoring

## Usage Guidelines

### Token Consumption

Always use design tokens for visual properties:

```typescript
// ✅ Correct
className="text-sage bg-mint p-4 rounded-lg shadow-md"

// ❌ Incorrect
style={{ color: '#7BA05B', padding: '16px' }}
```

### Animation Implementation

Use standardized animation variants:

```typescript
// ✅ Correct
<motion.div variants={standardAnimations.fadeIn}>

// ❌ Incorrect
<motion.div animate={{ opacity: 1 }}>
```

### State Management

Separate concerns appropriately:

```typescript
// UI state - use useUIStore
const { theme, setTheme } = useUIStore();

// App state - use useAppStore
const { user, preferences } = useAppStore();

// Animation state - use useAnimationStore
const { reducedMotion } = useAnimationStore();
```

## Testing Strategy

### Automated Testing

- Unit tests for all utilities
- Integration tests for state management
- Accessibility tests with axe-core
- Visual regression tests
- Performance benchmarks

### Manual Testing

- Cross-browser compatibility
- Mobile responsiveness
- Keyboard navigation
- Screen reader testing
- Performance profiling

## Migration Guide

### From Legacy Components

1. Replace inline styles with design tokens
2. Add animation variants from standardAnimations
3. Integrate with appropriate store
4. Add accessibility attributes
5. Update tests

### Breaking Changes

- Color values now use HSL format
- Animation props changed to variants
- State management centralized
- Import paths updated

## Future Enhancements

### Planned Features

- Design token synchronization with Figma
- Advanced animation orchestration
- Real-time performance monitoring
- Automated accessibility scanning
- Component usage analytics

### Scalability

- Token generation from design tools
- Dynamic theme switching
- Component composition patterns
- Micro-frontend architecture support
