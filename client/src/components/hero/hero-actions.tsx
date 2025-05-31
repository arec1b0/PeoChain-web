import { motion } from 'framer-motion';
import { Workflow, TestTube, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroAction {
  type: 'primary' | 'secondary';
  label: string;
  icon: string;
  href: string;
}

interface HeroActionsProps {
  actions: HeroAction[];
}

const iconMap = {
  Workflow,
  TestTube,
  BookOpen
};

export default function HeroActions({ actions }: HeroActionsProps) {
  const handleActionClick = (href: string) => {
    if (href === '#') {
      console.log('Testnet action clicked');
      return;
    }
    window.location.href = href;
  };

  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {actions.map((action, index) => {
        const IconComponent = iconMap[action.icon as keyof typeof iconMap];
        
        return (
          <Button 
            key={index}
            size="lg"
            variant={action.type === 'primary' ? 'default' : 'outline'}
            onClick={() => handleActionClick(action.href)}
            className={
              action.type === 'primary' 
                ? "bg-sage hover:bg-medium-forest text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                : "border-2 border-sage text-forest hover:bg-sage hover:text-white font-raleway font-medium text-lg px-8 py-4 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            }
          >
            {IconComponent && <IconComponent className="mr-2 h-5 w-5" />}
            {action.label}
          </Button>
        );
      })}
    </motion.div>
  );
}