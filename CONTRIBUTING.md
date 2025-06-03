# Contributing Guidelines

## Code Quality Standards

### TypeScript Configuration

- Strict mode enabled
- No explicit `any` types allowed
- Prefer type assertions over non-null assertions
- Use proper return types for all functions

### Component Architecture

```typescript
// ✅ Correct: Single responsibility, memoized
const ComponentCard = React.memo<ComponentCardProps>(({ data, onAction }) => {
  const handleClick = React.useCallback(() => {
    onAction(data.id);
  }, [data.id, onAction]);

  return <Card onClick={handleClick}>{data.title}</Card>;
});

// ❌ Incorrect: Multiple responsibilities, no memoization
const LargeComponent = ({ data, settings, user }) => {
  // ... 200+ lines of mixed concerns
};
```

### File Structure Standards

```
src/
├── components/
│   ├── feature-name/
│   │   ├── component-name.tsx        # Main component
│   │   ├── component-data.ts         # Data/types
│   │   └── index.ts                  # Barrel export
│   └── ui/                           # Reusable UI components
├── hooks/                            # Custom hooks
├── utils/                            # Pure utility functions
└── types/                            # Type definitions
```

### Naming Conventions

- **Components**: PascalCase (`TechComponentCard`)
- **Files**: kebab-case (`tech-component-card.tsx`)
- **Variables**: camelCase (`isExpanded`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_ENDPOINTS`)
- **Types/Interfaces**: PascalCase (`ComponentProps`)

### Testing Requirements

- Minimum 80% code coverage
- Unit tests for all utilities
- Component tests for UI logic
- Integration tests for user flows
- Accessibility tests with axe-core

### Testing Structure

```typescript
// ✅ Correct test structure
describe('ComponentName', () => {
  const mockProps = { /* realistic data */ };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with required props', () => {
    render(<ComponentName {...mockProps} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interactions', () => {
    const onAction = vi.fn();
    render(<ComponentName {...mockProps} onAction={onAction} />);

    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalledWith(mockProps.id);
  });
});
```

## Development Workflow

### Pre-commit Checklist

- [ ] TypeScript compilation passes
- [ ] ESLint rules pass
- [ ] Tests pass with coverage >80%
- [ ] Accessibility tests pass
- [ ] Performance regression check

### Branch Strategy

- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `refactor/*`: Code improvements

### Commit Standards

```
type(scope): brief description

feat(auth): add multi-factor authentication
fix(ui): resolve button accessibility issues
refactor(components): split large hero section
test(utils): add comprehensive validation tests
docs(api): update endpoint documentation
```

### Pull Request Requirements

1. **Code Quality**

   - All linting rules pass
   - TypeScript strict mode compliance
   - No console.log statements

2. **Testing**

   - New features have tests
   - Bug fixes include regression tests
   - Coverage maintains 80%+ threshold

3. **Documentation**

   - Public APIs documented
   - Complex logic commented
   - README updated if needed

4. **Performance**
   - Bundle size impact verified
   - Lighthouse score maintained
   - No memory leaks introduced

## Component Development

### Single Responsibility Principle

Each component should handle one specific concern:

```typescript
// ✅ Good: Single responsibility
const MetricsDisplay = ({ metrics }) => (
  <div className="grid grid-cols-2 gap-3">
    {Object.entries(metrics).map(([key, value]) => (
      <MetricCard key={key} label={key} value={value} />
    ))}
  </div>
);

// ❌ Bad: Multiple responsibilities
const ComplexCard = ({ data, onEdit, onDelete, onShare }) => {
  // Card UI + edit logic + delete logic + share logic
};
```

### Data Separation

Move data structures to dedicated files:

```typescript
// data/component-data.ts
export interface ComponentData {
  id: string;
  title: string;
  metrics: Record<string, string>;
}

export const componentData: ComponentData[] = [
  // ... data definitions
];

// components/component.tsx
import { componentData } from "@/data/component-data";
```

### Performance Optimization

- Use `React.memo` for pure components
- Implement `useCallback` for event handlers
- Apply `useMemo` for expensive calculations
- Avoid inline object/function creation

### Accessibility Standards

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Error Handling

### Component Error Boundaries

```typescript
const ComponentWithErrorBoundary = () => (
  <ErrorBoundary fallback={<ComponentErrorFallback />}>
    <ActualComponent />
  </ErrorBoundary>
);
```

### API Error Handling

```typescript
const useApiData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["api-data"],
    queryFn: fetchData,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return { data, error, isLoading };
};
```

## Code Review Guidelines

### Reviewer Checklist

- [ ] Code follows established patterns
- [ ] Tests cover new functionality
- [ ] Performance impact acceptable
- [ ] Accessibility requirements met
- [ ] Documentation updated
- [ ] No security vulnerabilities

### Review Focus Areas

1. **Architecture**: Component boundaries and responsibilities
2. **Performance**: Rendering efficiency and bundle size
3. **Testing**: Coverage and quality of tests
4. **Accessibility**: WCAG 2.1 compliance
5. **Security**: Input validation and XSS prevention

## Deployment Standards

### CI/CD Pipeline Requirements

- Automated testing suite
- Code quality gates
- Security scanning
- Performance monitoring
- Accessibility validation

### Production Readiness

- Error monitoring configured
- Performance metrics tracked
- Accessibility tested
- Cross-browser compatibility verified
- Mobile responsiveness confirmed

## Tools and Configuration

### Required Tools

- **TypeScript**: v5.0+
- **ESLint**: Strict configuration
- **Prettier**: Code formatting
- **Vitest**: Testing framework
- **Axe-core**: Accessibility testing

### IDE Configuration

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### Git Hooks

```bash
# Install husky for pre-commit hooks
npm run prepare

# Pre-commit: lint, test, type-check
# Pre-push: full test suite
```

## Performance Standards

### Bundle Size Limits

- Initial bundle: <400KB gzipped
- Component chunks: <100KB each
- Third-party dependencies: Audit regularly

### Lighthouse Scores

- Performance: >90
- Accessibility: 100
- Best Practices: >90
- SEO: >90

### Core Web Vitals

- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms

## Security Guidelines

### Input Validation

- Sanitize all user inputs
- Validate API responses
- Use TypeScript for type safety
- Implement CSP headers

### Data Handling

- No sensitive data in localStorage
- Secure API communication
- Proper error message handling
- Authentication state management

## Maintenance Procedures

### Weekly Tasks

- Dependency updates review
- Performance metrics analysis
- Test coverage verification
- Code quality assessment

### Monthly Tasks

- Architecture review
- Technical debt assessment
- Security audit
- Performance optimization review

### Quarterly Tasks

- Major dependency upgrades
- Architecture refactoring
- Tool configuration updates
- Team standards review
