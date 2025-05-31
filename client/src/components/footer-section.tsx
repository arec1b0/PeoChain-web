import { motion } from 'framer-motion';
import { Rocket, Book, Twitter, MessageCircle, Send, Github, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FooterSection() {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
    { icon: Send, href: '#', label: 'Telegram' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Edit, href: '#', label: 'Medium' },
  ];

  return (
    <section id="community" className="py-20 px-4 sm:px-6 lg:px-8 gradient-forest-dark">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-white mb-6">
            Join the <span className="text-sage">DeFi Revolution</span>
          </h2>
          <p className="text-lg sm:text-xl font-hammersmith text-white/80 mb-12 max-w-2xl mx-auto">
            Be part of the blockchain that's making decentralized finance accessible to everyone, everywhere.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button 
            size="lg"
            className="bg-sage hover:bg-medium-forest text-white px-8 py-4 rounded-2xl font-raleway font-medium text-lg transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Start Building Today
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-2xl font-raleway font-medium text-lg transform transition-all duration-300 hover:scale-105"
          >
            <Book className="mr-2 h-5 w-5" />
            View Documentation
          </Button>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          className="flex items-center justify-center space-x-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              className="text-white/70 hover:text-sage text-2xl transition-colors transform hover:scale-110"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon className="h-6 w-6" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-white/20 text-white/60 font-hammersmith"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p>&copy; 2024 PeoChain. Making DeFi accessible to all.</p>
        </motion.div>
      </div>
    </section>
  );
}
