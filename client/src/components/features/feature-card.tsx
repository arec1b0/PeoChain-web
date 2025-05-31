import { motion } from "framer-motion";
import {
  ChevronRight,
  Network,
  DollarSign,
  Zap,
  Star,
  Smartphone,
  Link,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CoreFeature } from "@/data/features-data";

interface FeatureCardProps {
  feature: CoreFeature;
  index: number;
  isInView: boolean;
}

const iconMap = {
  Network,
  DollarSign,
  Zap,
  Star,
  Smartphone,
  Link,
};

export default function FeatureCard({
  feature,
  index,
  isInView,
}: FeatureCardProps) {
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group cursor-pointer"
    >
      <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg transform transition-all duration-500 group-hover:shadow-2xl group-hover:border-sage/40 h-full">
        <CardContent className="p-8">
          {/* Icon and Metric */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:animate-pulse transition-all duration-300`}
            >
              {IconComponent && (
                <IconComponent className="text-white h-8 w-8" />
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-raleway font-bold text-sage">
                {feature.metric}
              </div>
              <div className="text-xs text-forest/60 font-hammersmith">
                Performance
              </div>
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
              <div
                key={idx}
                className="flex items-center text-sm text-forest/60"
              >
                <ChevronRight className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                <span className="font-hammersmith">{detail.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
