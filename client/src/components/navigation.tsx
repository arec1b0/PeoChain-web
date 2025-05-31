import { 
  useState, 
  useEffect, 
  useRef, 
  useCallback, 
  forwardRef, 
  type ReactNode,
  type KeyboardEvent,
  type MouseEvent,
  type FormEvent,
  type ChangeEvent,
  type FC,
  type ReactElement,
  type SVGProps,
  type ForwardedRef,
  type ImgHTMLAttributes
} from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Moon, Sun, ArrowRight, Zap, BookOpen, Home as HomeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/components/ui/theme-provider';
import { cn } from '@/lib/utils';
import { useOnClickOutside } from '@/hooks/use-click-outside';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useKeyPress, type KeyHandler } from '@/hooks/use-key-press';

type Theme = 'light' | 'dark' | 'system';
type ClickHandler = (e: MouseEvent<HTMLElement>) => void;

interface BrandmarkLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  children?: ReactNode;
}

const BrandmarkLogo = forwardRef<HTMLImageElement, BrandmarkLogoProps>(
  (props: BrandmarkLogoProps, ref: ForwardedRef<HTMLImageElement>) => {
    const { children, ...rest } = props;
    return (
      <img
        ref={ref}
        className="h-8 w-auto"
        src="/logo.png"
        alt="PeoChain"
        {...rest}
      />
    );
  }
);

BrandmarkLogo.displayName = 'BrandmarkLogo';

interface NavItem {
  label: string;
  href: string;
  id: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const Navigation: FC = (): ReactElement => {
  // Refs
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  
  // State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  
  // Hooks
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  
  // Lock body scroll when menu or search is open
  useLockBodyScroll(isMobileMenuOpen || isSearchOpen);

  // Define handleKeyDown before it's used in useEffect
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>, callback?: () => void): void => {
    if (e.key === 'Escape') {
      if (isSearchOpen) {
        setIsSearchOpen(false);
        searchButtonRef.current?.focus();
      } else if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    } else if ((e.key === 'Enter' || e.key === ' ') && callback) {
      callback();
    }
  }, [isSearchOpen, isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useOnClickOutside(mobileMenuRef, (): void => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  });

  // Close search when clicking outside
  useOnClickOutside(
    searchInputRef,
    (): void => {
      if (isSearchOpen) {
        setIsSearchOpen(false);
        searchButtonRef.current?.focus();
      }
    },
    ['mousedown', 'touchstart']
  );
  
  // Handle escape key
  useEffect(() => {
    const handleKeyPress = (e: globalThis.KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleKeyDown(e as unknown as KeyboardEvent<HTMLElement>);
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyDown]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      const focusableElements = mobileMenuRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
      
      return () => {
        lastFocusedElement.current?.focus();
      };
    }
    return undefined;
  }, [isMobileMenuOpen, isSearchOpen]);

  // Track scroll position for progress bar and header
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollTop > 10;
      
      setIsScrolled(scrolled);
      
      if (windowHeight > 0) {
        const progress = (scrollTop / windowHeight) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          setActiveSection(section.id);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: HomeIcon, id: 'home' },
    { href: '/technology', label: 'Technology', icon: Zap, id: 'technology' },
    { href: '/whitepaper', label: 'Whitepaper', icon: BookOpen, id: 'whitepaper' },
  ];

  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen((prev: boolean) => !prev);
  }, []);

  const toggleSearch = useCallback((): void => {
    setIsSearchOpen((prev: boolean) => !prev);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  }, []);

  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateToPage = useCallback((path: string): void => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  }, []);

  const navigateToHome = useCallback((e?: KeyboardEvent<HTMLElement> | MouseEvent<HTMLElement>): void => {
    if (e && 'key' in e && e.key !== 'Enter' && e.key !== ' ') {
      return;
    }
    navigateToPage('/');
  }, [navigateToPage]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const matchingItem = navItems.find((item: NavItem) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingItem) {
        navigateToPage(matchingItem.href);
      }
    }
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [searchQuery, navigateToPage, navItems]);

  return (
    <div className="relative">
      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <BrandmarkLogo />
              <span className="inline-block font-bold">PeoChain</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-9 w-9"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={toggleSearch}
                ref={searchButtonRef}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 md:hidden"
                onClick={toggleMobileMenu}
                ref={menuButtonRef}
              >
                {isMobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Progress Bar */}
      {isScrolled && (
        <div 
          className="fixed top-0 left-0 right-0 z-50" 
          role="progressbar" 
          aria-valuenow={Math.round(scrollProgress)} 
          aria-valuemin={0} 
          aria-valuemax={100}
          aria-label="Page scroll progress"
        >
          <Progress value={scrollProgress} className="h-1" />
        </div>
      )}
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="fixed inset-x-0 top-0 z-50 min-h-screen w-full border-r bg-background px-6 pb-32 shadow-lg">
              <div className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center">
                  <BrandmarkLogo />
                  <span className="ml-2 font-bold">PeoChain</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="mt-8 grid gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-2 text-lg font-medium hover:text-primary"
                    onClick={() => navigateToPage(item.href)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="container flex h-full items-center justify-center">
              <div className="w-full max-w-lg">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="h-12 pr-12"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="absolute right-0 top-0 h-12 w-12"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </Button>
                </form>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 h-9 w-9"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close search</span>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
          role="progressbar" 
          aria-valuenow={Math.round(scrollProgress)} 
          aria-valuemin={0} 
          aria-valuemax={100}
          aria-label="Page scroll progress"
        >
          <Progress value={scrollProgress} className="h-1" />
        </div>
      )}
      
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
        <nav 
          className={cn(
            'flex items-center justify-between px-4 py-3 transition-all duration-300',
            isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
          )}
          aria-label="Main navigation"
        >
          <div className="flex items-center space-x-2">
            <Link 
              href="/" 
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md p-1 -ml-1"
              aria-label="Go to homepage"
              aria-current={window.location.pathname === '/' ? 'page' : undefined}
              onClick={navigateToHome}
              onKeyDown={(e) => handleKeyDown(e, navigateToHome)}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                window.location.pathname.startsWith(item.href)
                  ? 'text-foreground bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
              aria-current={window.location.pathname.startsWith(item.href) ? 'page' : undefined}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </Link>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => window.open('/app', '_blank')}
          >
            Launch App
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Mobile menu and search buttons */}
        <div className="flex md:hidden items-center space-x-1">
          <button
            ref={searchButtonRef}
            type="button"
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Search"
            aria-expanded={isSearchOpen}
            aria-controls="search-dialog"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background lg:hidden"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
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
                    onClick={() => navigateToPage(item.href)}
                    onKeyDown={(e) => handleKeyDown(e, () => navigateToPage(item.href))}
                    className={`flex items-center space-x-3 w-full text-left py-3 px-3 rounded-lg font-raleway font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sage text-foreground hover:text-sage hover:bg-sage/5`}
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
