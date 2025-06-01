import React from 'react';
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
  const { Suspense } = React;

  return (
    <ThemeProvider 
      defaultTheme="light" 
      storageKey="peochain-theme"
    >
      <ErrorBoundaryEnhanced fallback={DefaultErrorFallback}>
        <div className={`min-h-screen flex flex-col ${className}`}>
          <ErrorBoundaryEnhanced>
            <Navigation />
          </ErrorBoundaryEnhanced>
          
          <main className="flex-grow">
            {children}
          </main>
          
          {showFooter && (
            <ErrorBoundaryEnhanced>
              <Suspense fallback={<SectionLoadingSkeleton />}>
                <FooterSection />
              </Suspense>
            </ErrorBoundaryEnhanced>
          )}
        </div>
      </ErrorBoundaryEnhanced>
    </ThemeProvider>
  );
};

export default MainLayout;
