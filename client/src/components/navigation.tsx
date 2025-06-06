import React from "react";
import { cn } from "@/lib/utils";
import { NavigationLogo } from "./navigation/navigation-logo";
import { NavigationProgress } from "./navigation/navigation-progress";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { useNavigationState } from "./navigation/use-navigation-state";

const Navigation: React.FC = () => {
  const {
    isScrolled,
    isMobileMenuOpen,
    isSearchOpen,
    searchQuery,
    scrollProgress,
    setSearchQuery,
    toggleMobileMenu,
    toggleSearch,
    handleSearchSubmit,
    navigateToHome,
  } = useNavigationState();

  return (
    <>
      <NavigationProgress
        isScrolled={isScrolled}
        scrollProgress={scrollProgress}
      />

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ maxHeight: "100vh" }}
      >
        <nav
          className={cn(
            "flex items-center justify-between px-6 lg:px-8 py-4 lg:py-5 transition-all duration-300",
            isScrolled
              ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg border-b border-sage/20"
              : "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm",
          )}
          aria-label="Main navigation"
        >
          <NavigationLogo onNavigateHome={navigateToHome} />
          <DesktopNavigation />
          <MobileNavigation
            isMobileMenuOpen={isMobileMenuOpen}
            isSearchOpen={isSearchOpen}
            searchQuery={searchQuery}
            onToggleMobileMenu={toggleMobileMenu}
            onToggleSearch={toggleSearch}
            onSearchQueryChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
          />
        </nav>
      </header>
    </>
  );
};

export default Navigation;