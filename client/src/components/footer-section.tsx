import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Book, Twitter, MessageCircle, Github, Mail, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FooterSection() {
  const socialLinks = [
    { icon: Twitter, href: 'https://x.com/peochain?s=21', label: 'X (Twitter)' },
    { icon: MessageCircle, href: 'https://discord.gg/ahAyh5pA', label: 'Discord' },
    { icon: Github, href: 'https://github.com/peochain', label: 'GitHub' },
    { icon: Mail, href: 'mailto:info@peochain.xyz', label: 'Email' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/peochain/', label: 'LinkedIn' },
  ];

  return (
    <section id="community" className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 gradient-forest-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-raleway font-medium text-white mb-4 sm:mb-6">
            Join the <span className="text-sage">DeFi Revolution</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-hammersmith text-white/80 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Be part of the blockchain that's making decentralized finance accessible to everyone, everywhere.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8 sm:mb-12 px-4 sm:px-0 w-full sm:w-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg"
            className="bg-sage hover:bg-medium-forest active:bg-dark-forest text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-raleway font-medium text-base sm:text-lg transform transition-all duration-300 hover:scale-105 shadow-lg touch-action-manipulation active:scale-[0.98] active:shadow-md min-h-[56px] min-w-[120px] w-full sm:w-auto select-none tap-highlight-transparent"
            mobileOptimized={true}
            aria-label="Start building with PeoChain"
          >
            <Rocket className="mr-2 h-5 w-5 sm:h-5 sm:w-5" aria-hidden="true" />
            Start Building Today
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-sage text-sage hover:bg-sage hover:text-white active:bg-medium-forest px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-raleway font-medium text-base sm:text-lg transform transition-all duration-300 hover:scale-105 touch-action-manipulation active:scale-[0.98] min-h-[56px] min-w-[120px] w-full sm:w-auto select-none tap-highlight-transparent"
            mobileOptimized={true}
            aria-label="View PeoChain documentation"
          >
            <Book className="mr-2 h-5 w-5 sm:h-5 sm:w-5" aria-hidden="true" />
            View Documentation
          </Button>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          role="navigation"
          aria-label="Social media links"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-sage active:text-sage/90 text-xl sm:text-2xl transition-colors transform hover:scale-110 touch-action-manipulation tap-highlight-transparent inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full hover:bg-white/10 active:bg-white/5 focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-forest focus-visible:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
              role="link"
            >
              <social.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
              <span className="sr-only">{social.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 text-white/60 font-hammersmith text-sm sm:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2025 PeoChain. Making DeFi accessible to all.</p>
        </motion.div>
      </div>
    </section>
  );
}
