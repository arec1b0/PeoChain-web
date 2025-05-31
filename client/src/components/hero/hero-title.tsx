import { motion } from 'framer-motion';

interface HeroTitleProps {
  title: {
    primary: string;
    highlight: string;
    secondary: string;
    secondaryHighlight: string;
    suffix: string;
  };
}

export default function HeroTitle({ title }: HeroTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-raleway font-medium text-forest leading-tight mb-6">
        {title.primary} <span className="text-sage">{title.highlight}</span>.<br />
        {title.secondary} <span className="text-medium-forest">{title.secondaryHighlight}</span> {title.suffix}
      </h1>
    </motion.div>
  );
}