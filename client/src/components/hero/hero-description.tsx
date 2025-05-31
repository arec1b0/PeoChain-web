interface HeroDescriptionProps {
  description: {
    text: string;
    tps: string;
    finality: string;
    accessibility: string;
    fees: string;
  };
}

export default function HeroDescription({ description }: HeroDescriptionProps) {
  return (
    <p className="text-lg sm:text-xl lg:text-2xl font-hammersmith text-forest/80 max-w-4xl mx-auto mb-12 leading-relaxed">
      {description.text} <strong className="text-sage">{description.tps}</strong> with{' '}
      <strong className="text-medium-forest">{description.finality}</strong> and {description.accessibility}{' '}
      <strong className="text-dark-sage">{description.fees}</strong>.
    </p>
  );
}