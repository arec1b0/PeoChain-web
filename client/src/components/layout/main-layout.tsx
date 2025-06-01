import React from 'react';
const { Suspense } = React;
import { ErrorBoundaryEnhanced, DefaultErrorFallback } from '@/components/ui/error-boundary-enhanced';
import Navigation from '@/components/navigation';
import FooterSection from '@/components/footer-section';
import { SectionLoadingSkeleton } from '@/components/ui/loading-states';
import { ThemeProvider } from '@/components/ui/theme-provider';

interface MainLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showFooter = true,
  className = ''
}: MainLayoutProps) => {
  // Properly structure the JSX to provide the children props correctly
  // Create the children elements before using them in JSX to make TypeScript happy
  const mainContent = (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <ErrorBoundaryEnhanced children={<Navigation />} />
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && (
        <ErrorBoundaryEnhanced children={
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <FooterSection />
          </Suspense>
        } />
      )}
    </div>
  );

  return (
    <ThemeProvider 
      defaultTheme="light" 
      storageKey="peochain-theme"
      children={
        <ErrorBoundaryEnhanced 
          fallback={({ 
            error, 
            resetError, 
            errorInfo 
          }: { 
            error: Error; 
            resetError: () => void; 
            errorInfo: React.ErrorInfo | null 
          }) => (
            <DefaultErrorFallback error={error} resetError={resetError} errorInfo={errorInfo} />
          )}
          children={mainContent}
        />
      }
    />
  )
};

export default MainLayout;
