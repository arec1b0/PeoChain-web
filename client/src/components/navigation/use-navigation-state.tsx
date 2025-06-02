import React from "react";
const { useState, useEffect, useCallback } = React;

// Consolidated navigation state hook
export const useNavigationState = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Consolidated scroll handler with throttling for performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min((scrollY / windowHeight) * 100, 100);

          setScrollProgress(progress);
          setIsScrolled(scrollY > 10);

          // Update active section based on scroll position
          const sections = document.querySelectorAll("section[id]");
          let currentSection = "home";
          
          sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
              currentSection = section.id;
            }
          });
          
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isMobileMenuOpen, isSearchOpen]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(prev => !prev);
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, []);

  const navigateToHome = useCallback((e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && "key" in e && e.key !== "Enter" && e.key !== " ") {
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    // State
    isScrolled,
    isMobileMenuOpen,
    isSearchOpen,
    searchQuery,
    scrollProgress,
    activeSection,
    
    // Actions
    setSearchQuery,
    toggleMobileMenu,
    toggleSearch,
    handleSearchSubmit,
    navigateToHome,
  };
};