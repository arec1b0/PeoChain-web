import { memo } from "react";
import { HeroDescriptionProps } from "@/data/hero-data";

const HeroDescription = memo<HeroDescriptionProps>(({ description }) => {
  return (
    <p
      className="text-lg sm:text-xl lg:text-2xl font-hammersmith text-forest/80 max-w-4xl mx-auto mb-12 leading-relaxed"
      aria-label="PeoChain achieves unprecedented performance with ultra-low fees and global accessibility"
    >
      {description.text}{" "}
      <strong className="text-sage">{description.tps}</strong> with{" "}
      <strong className="text-medium-forest">{description.finality}</strong> and{" "}
      {description.accessibility}{" "}
      <strong className="text-dark-sage">{description.fees}</strong>.
    </p>
  );
});

HeroDescription.displayName = "HeroDescription";

export default HeroDescription;
