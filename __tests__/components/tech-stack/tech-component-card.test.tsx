import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TechComponentCard from '@/components/tech-stack/tech-component-card';
import { Workflow } from 'lucide-react';

const mockComponent = {
  id: 'test-component',
  icon: Workflow,
  title: 'Test Component',
  subtitle: 'Test Subtitle',
  description: 'Test description for component',
  gradient: 'bg-sage',
  details: {
    overview: 'Test overview of the component',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3'
    ],
    metrics: {
      'Test Metric 1': '100%',
      'Test Metric 2': '50ms'
    }
  }
};

describe('TechComponentCard', () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it('renders component with title and description', () => {
    render(
      <TechComponentCard
        {...mockComponent}
        isExpanded={false}
        onToggle={mockOnToggle}
        index={0}
        isInView={true}
      />
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('Test description for component')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('shows details when expanded', () => {
    render(
      <TechComponentCard
        {...mockComponent}
        isExpanded={true}
        onToggle={mockOnToggle}
        index={0}
        isInView={true}
      />
    );

    expect(screen.getByText('Test overview of the component')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Test Metric 1')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('calls onToggle when toggle button is clicked', () => {
    render(
      <TechComponentCard
        {...mockComponent}
        isExpanded={false}
        onToggle={mockOnToggle}
        index={0}
        isInView={true}
      />
    );

    const toggleButton = screen.getByRole('button', { name: /show details/i });
    fireEvent.click(toggleButton);

    expect(mockOnToggle).toHaveBeenCalledWith('test-component');
  });

  it('has proper accessibility attributes', () => {
    render(
      <TechComponentCard
        {...mockComponent}
        isExpanded={false}
        onToggle={mockOnToggle}
        index={0}
        isInView={true}
      />
    );

    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-controls', 'tech-details-test-component');
  });
});