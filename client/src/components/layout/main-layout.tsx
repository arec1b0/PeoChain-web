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
  // Destructure React.Suspense to use within component
  const { Suspense } = React;

  // Define the render functions separately for better TypeScript inferencing
  const themeRenderFn = (themeProps: React.PropsWithChildren<unknown>): React.ReactElement => {
    const errorBoundaryRenderFn = (errorProps: React.PropsWithChildren<unknown>): React.ReactElement => {
      const navigationRenderFn = (): React.ReactElement => <Navigation />;
      
      const footerRenderFn = (): React.ReactElement => (
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <FooterSection />
        </Suspense>
      );
      
      return (
        <div className={`min-h-screen flex flex-col ${className}`}>
          <ErrorBoundaryEnhanced children={navigationRenderFn} />
          
          <main className="flex-grow">
            {children}
          </main>
          
          {showFooter && (
            <ErrorBoundaryEnhanced children={footerRenderFn} />
          )}
        </div>
      );
    };
    
    return (
      <ErrorBoundaryEnhanced 
        fallback={DefaultErrorFallback}
        children={errorBoundaryRenderFn}
      />
    );
  };

  return (
    <ThemeProvider 
      defaultTheme="light" 
      storageKey="peochain-theme"
      children={themeRenderFn}
    />
  );
};

export default MainLayout;
