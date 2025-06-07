import React from "react";
const { useRef, useEffect } = React;
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ArrowRight, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  id: string;
}

const navItems: NavItem[] = [
  { href: "/technology", label: "Technology", icon: Zap, id: "technology" },
  {
    href: "/whitepaper",
    label: "Whitepaper",
    icon: BookOpen,
    id: "whitepaper",
  },
];

interface MobileNavigationProps {
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  onToggleMobileMenu: () => void;
  onToggleSearch: () => void;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isMobileMenuOpen,
  isSearchOpen,
  searchQuery,
  onToggleMobileMenu,
  onToggleSearch,
  onSearchQueryChange,
  onSearchSubmit,
}: MobileNavigationProps) => {
  const [location] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const onTouchStart = () => {
    // Handle touch start event
  };

  const onTouchEnd = () => {
    // Handle touch end event
  };

  return (
    <>
      {/* Mobile menu and search buttons */}
      <div className="flex lg:hidden items-center space-x-2">
        <button
          ref={searchButtonRef}
          type="button"
          onClick={onToggleSearch}
          className="touch-target min-h-[44px] min-w-[44px] p-3 rounded-lg hover:bg-sage/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-dashed focus-visible:outline-2"
          aria-label="Search"
          aria-expanded={isSearchOpen}
          aria-controls="search-dialog"
        >
          <Search className="h-6 w-6 text-gray-900 dark:text-gray-100" aria-hidden="true" />
        </button>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={onToggleMobileMenu}
          className="touch-target min-h-[44px] min-w-[44px] p-3 rounded-lg hover:bg-sage/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-dashed focus-visible:outline-2"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
          style={{ touchAction: "manipulation" }}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-900 dark:text-gray-100" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900 dark:text-gray-100" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
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
                      "block px-4 py-4 rounded-md text-base font-medium transition-colors",
                      "min-h-[44px] overflow-hidden overflow-wrap-break-word",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-dashed focus-visible:outline-2",
                      location.startsWith(item.href)
                        ? "text-white bg-dark-forest font-semibold"
                        : "text-gray-900 dark:text-gray-100 hover:bg-sage/20",
                    )}
                    onClick={() => {
                      onToggleMobileMenu();
                      menuButtonRef.current?.focus();
                    }}
                    aria-current={
                      location.startsWith(item.href) ? "page" : undefined
                    }
                  >
                    <div className="flex items-center">
                      {item.icon && <Icon className="mr-3 h-5 w-5" aria-hidden="true" />}
                      <span className="overflow-wrap-break-word max-w-[90vw]">{item.label}</span>
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
                  onToggleMobileMenu();
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
              <form onSubmit={onSearchSubmit} className="relative">
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
                    onSearchQueryChange(e.target.value)
                  }
                  autoFocus
                  aria-label="Search"
                  aria-describedby="search-instructions"
                />
                <button
                  type="button"
                  onClick={() => {
                    onToggleSearch();
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
                className="mt-3 text-sm text-muted-foreground text-center"
              >
                Press Escape to close search
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};