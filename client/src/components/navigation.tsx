import React from "react";
import { cn } from "@/lib/utils";
import { NavigationLogo } from "./navigation/navigation-logo";
import { NavigationProgress } from "./navigation/navigation-progress";
import { DesktopNavigation } from "./navigation/desktop-navigation";
import { MobileNavigation } from "./navigation/mobile-navigation";
import { useNavigationState } from "./navigation/use-navigation-state";

export const Navigation: React.FC = () => {
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
      <NavigationProgress isScrolled={isScrolled} scrollProgress={scrollProgress} />

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
            <button
              ref={searchButtonRef}
              type="button"
              onClick={toggleSearch}
              className="p-3 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Search"
              aria-expanded={isSearchOpen}
              aria-controls="search-dialog"
            >
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMobileMenu}
              className="p-3 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="true"
              style={{ touchAction: "manipulation" }}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-background shadow-lg md:hidden z-40 border-t border-border max-h-[calc(100vh-4rem)]"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
            >
              <h2 id="mobile-menu-title" className="sr-only">
                Mobile Menu
              </h2>
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon || "div";
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 rounded-md text-base font-medium transition-colors",
                        "touch-action-manipulation tap-highlight-transparent",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        location.startsWith(item.href)
                          ? "text-primary bg-accent font-semibold"
                          : "text-foreground hover:bg-accent hover:bg-opacity-50",
                      )}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        menuButtonRef.current?.focus();
                      }}
                      aria-current={
                        location.startsWith(item.href) ? "page" : undefined
                      }
                    >
                      <div className="flex items-center">
                        {item.icon && <Icon className="mr-2 h-4 w-4" />}
                        {item.label}
                        {location.startsWith(item.href) && (
                          <ArrowRight
                            className="ml-2 h-4 w-4"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </Link>
                  );
                })}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 justify-center py-3 text-base"
                  onClick={() => {
                    window.open("/validator-bonds", "_blank");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  To Bonds
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Search dialog"
            >
              <div className="w-full max-w-2xl">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search
                    className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    aria-hidden="true"
                  />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="w-full pl-10 pr-12 py-6 text-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearchQuery(e.target.value)
                    }
                    autoFocus
                    aria-label="Search"
                    aria-describedby="search-instructions"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      searchButtonRef.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" aria-hidden="true" />
                  </button>
                </form>
                <p
                  id="search-instructions"
                  className="mt-4 text-center text-sm text-muted-foreground"
                >
                  {searchQuery ? "No results found" : "Type to search"}
                  <span className="block mt-1 text-xs opacity-70">
                    Press Esc to close
                  </span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navigation;
