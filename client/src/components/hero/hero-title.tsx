import { motion } from "framer-motion";
import { memo } from "react";
import { HeroTitleProps } from "@/data/hero-data";
import { useReducedMotion } from "@/hooks/use-accessibility";

const HeroTitle = memo<HeroTitleProps>(({ title }) => {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
      };

  return (
    <motion.div {...animationProps}>
      <h1
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-raleway font-medium text-forest leading-tight mb-6"
        aria-label="PeoChain: Solving the Blockchain Trilemma, Making DeFi Accessible to All"
      >
        {title.primary} <span className="text-sage">{title.highlight}</span>.
        <br />
        {title.secondary}{" "}
        <span className="text-medium-forest">{title.secondaryHighlight}</span>{" "}
        {title.suffix}
      </h1>
    </motion.div>
  );
});

HeroTitle.displayName = "HeroTitle";

export default HeroTitle;
