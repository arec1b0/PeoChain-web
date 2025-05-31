import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hexagon, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Search, 
  ChevronDown,
  Home,
  Sparkles,
  Layers3,
  Blocks,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);

      // Determine active section
      const sections = ['home', 'technology', 'ecosystem', 'features', 'community'];
      const sectionElements = sections.map(id => ({
        id,
        element: document.getElementById(id) || document.querySelector(`#${id}`)
      }));

      let currentSection = 'home';
      sectionElements.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const navItems = [
    { href: '#technology', label: 'Technology', icon: Sparkles, id: 'technology' },
    { href: '#ecosystem', label: 'Ecosystem', icon: Layers3, id: 'ecosystem' },
    { href: '#features', label: 'Features', icon: Blocks, id: 'features' },
    { href: '#community', label: 'Community', icon: MessageSquare, id: 'community' },
  ];

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simple search implementation - scroll to matching section
      const query = searchQuery.toLowerCase();
      const matchingSection = navItems.find(item => 
        item.label.toLowerCase().includes(query) || 
        item.id.toLowerCase().includes(query)
      );
      
      if (matchingSection) {
        scrollToSection(matchingSection.href);
      }
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress 
          value={scrollProgress} 
          className="h-1 rounded-none bg-transparent"
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-1 w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 dark:bg-background/95 backdrop-blur-md shadow-lg' 
            : 'bg-background/90 dark:bg-background/90 backdrop-blur-md'
        } border-b border-sage/20 dark:border-sage/30`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.button
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-sage rounded-lg p-1"
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              onKeyDown={(e) => handleKeyDown(e, scrollToTop)}
              aria-label="PeoChain homepage"
            >
              <div className="w-8 h-8 gradient-sage-forest rounded-lg flex items-center justify-center">
                <Hexagon className="text-white h-4 w-4" />
              </div>
              <span className="text-xl font-hammersmith font-medium text-foreground dark:text-foreground">
                PeoChain
              </span>
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <button
                onClick={scrollToTop}
                onKeyDown={(e) => handleKeyDown(e, scrollToTop)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-raleway font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage ${
                  activeSection === 'home' 
                    ? 'text-sage bg-sage/10' 
                    : 'text-foreground hover:text-sage hover:bg-sage/5'
                }`}
                aria-label="Go to home section"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(item.href))}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-raleway font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage ${
                    activeSection === item.id 
                      ? 'text-sage bg-sage/10' 
                      : 'text-foreground hover:text-sage hover:bg-sage/5'
                  }`}
                  aria-label={`Go to ${item.label} section`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {isSearchOpen ? (
                    <motion.form
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleSearchSubmit}
                      className="flex items-center"
                    >
                      <Input
                        type="text"
                        placeholder="Search sections..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 text-sm bg-background/50 border-sage/30 focus:border-sage"
                        autoFocus
                        aria-label="Search website sections"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsSearchOpen(false)}
                        className="ml-1"
                        aria-label="Close search"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsSearchOpen(true)}
                      className="h-9 w-9 text-foreground hover:text-sage"
                      aria-label="Open search"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 text-foreground hover:text-sage"
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Launch App Button */}
              <Button 
                onClick={() => window.location.href = '/validator-bonds'}
                className="bg-sage hover:bg-medium-forest text-white font-raleway font-medium h-9"
              >
                Validator Bonds
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 text-foreground hover:text-sage"
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-foreground hover:text-sage"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-background/95 dark:bg-background/95 backdrop-blur-md border-t border-sage/20"
              role="menu"
            >
              <div className="px-4 py-4 space-y-2">
                {/* Mobile Search */}
                <form onSubmit={handleSearchSubmit} className="mb-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search sections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/50 border-sage/30 focus:border-sage"
                      aria-label="Search website sections"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </form>

                {/* Home */}
                <button
                  onClick={scrollToTop}
                  onKeyDown={(e) => handleKeyDown(e, scrollToTop)}
                  className={`flex items-center space-x-3 w-full text-left py-3 px-3 rounded-lg font-raleway font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage ${
                    activeSection === 'home' 
                      ? 'text-sage bg-sage/10' 
                      : 'text-foreground hover:text-sage hover:bg-sage/5'
                  }`}
                  role="menuitem"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </button>

                {/* Navigation Items */}
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, () => scrollToSection(item.href))}
                    className={`flex items-center space-x-3 w-full text-left py-3 px-3 rounded-lg font-raleway font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage ${
                      activeSection === item.id 
                        ? 'text-sage bg-sage/10' 
                        : 'text-foreground hover:text-sage hover:bg-sage/5'
                    }`}
                    role="menuitem"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="pt-4 border-t border-sage/20">
                  <Button 
                    onClick={() => window.location.href = '/validator-bonds'}
                    className="w-full bg-sage hover:bg-medium-forest text-white font-raleway font-medium"
                  >
                    Validator Bonds
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
