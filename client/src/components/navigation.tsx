import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link2, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#technology', label: 'Technology' },
    { href: '#ecosystem', label: 'Ecosystem' },
    { href: '#validators', label: 'Validators' },
    { href: '#community', label: 'Community' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-mint/95 backdrop-blur-md shadow-lg' : 'bg-mint/90 backdrop-blur-md'
      } border-b border-sage/20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 gradient-sage-forest rounded-lg flex items-center justify-center">
              <Link2 className="text-white h-4 w-4" />
            </div>
            <span className="text-xl font-hammersmith font-medium text-forest">PeoChain</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-forest hover:text-sage transition-colors font-raleway font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="icon"
              className="md:hidden text-forest"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Button className="hidden md:block bg-sage hover:bg-medium-forest text-white font-raleway font-medium">
              Launch App
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-mint/95 backdrop-blur-md border-t border-sage/20"
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left text-forest hover:text-sage transition-colors font-raleway font-medium py-2"
              >
                {item.label}
              </button>
            ))}
            <Button className="w-full bg-sage hover:bg-medium-forest text-white font-raleway font-medium mt-4">
              Launch App
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
