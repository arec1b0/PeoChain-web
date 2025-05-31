import { motion } from 'framer-motion';

interface FeaturesHeaderProps {
  title: string;
  highlight: string;
  description: string;
  isInView: boolean;
}

export default function FeaturesHeader({ title, highlight, description, isInView }: FeaturesHeaderProps) {
  return (
    <motion.div 
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-raleway font-medium text-forest mb-6">
        {title} <span className="text-sage">{highlight}</span>
      </h2>
      <p className="text-lg sm:text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
        {description}
      </p>
    </motion.div>
  );
}