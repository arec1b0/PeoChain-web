import { motion } from 'framer-motion';
import { ChevronRight, Gauge, DollarSign, Zap, Award, Smartphone, Link2 } from 'lucide-react';
import { TouchableCard, CardContent } from '@/components/ui/card';
import { useTouch } from '@/hooks';
import { CoreFeature } from '@/data/features-data';

interface FeatureCardProps {
  feature: CoreFeature;
  index: number;
  isInView: boolean;
  // React internal props not needed in interface
}

const iconMap = {
  Network: Gauge, // Replace Network with Gauge
  DollarSign,
  Zap,
  Star: Award, // Replace Star with Award
  Smartphone,
  Link: Link2 // Replace Link with Link2
};

export default function FeatureCard({ feature, index, isInView }: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
  const touchHandlers = useTouch({
    provideFeedback: true,
    feedbackDuration: 200,
    activeClass: "touch-active"
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group touch-action-manipulation select-none"
      aria-label={`Feature: ${feature.title}`}
    >
      <TouchableCard 
        className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg transform transition-all duration-500 group-hover:shadow-2xl group-hover:border-sage/40 h-full"
        provideFeedback={true}
        actionable={true}
        role="button"
        aria-label={feature.title}
        onTouchStart={touchHandlers.onTouchStart}
        onTouchEnd={touchHandlers.onTouchEnd}
        onTouchCancel={touchHandlers.onTouchCancel}
      >
        <CardContent className="p-5 sm:p-6 md:p-8">
          {/* Icon and Metric */}
          <div className="flex items-start justify-between mb-6">
            <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:animate-pulse transition-all duration-300`}>
              {IconComponent && <IconComponent className="text-white h-8 w-8" />}
            </div>
            <div className="text-right">
              <div className="text-lg font-raleway font-bold text-sage">{feature.metric}</div>
              <div className="text-xs text-forest/60 font-hammersmith">Performance</div>
            </div>
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-raleway font-semibold text-forest mb-3 group-hover:text-sage transition-colors">
            {feature.title}
          </h3>
          <p className="text-forest/70 font-hammersmith leading-relaxed mb-4">
            {feature.description}
          </p>

          {/* Feature Details */}
          <div className="space-y-2">
            {feature.details.map((detail, idx) => (
              <div key={idx} className="flex items-center text-sm text-forest/60">
                <ChevronRight className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                <span className="font-hammersmith">{detail.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </TouchableCard>
    </motion.div>
  );
}