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
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
        style={{ maxHeight: "100vh" }}
      >
        <nav
          className={cn(
            "flex items-center justify-between px-4 py-2 sm:py-3 transition-all duration-300",
            isScrolled
              ? "bg-background/80 backdrop-blur-md shadow-sm"
              : "bg-transparent",
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