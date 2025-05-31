import { motion } from "framer-motion";
import { Clock, Shield, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TechnicalHighlight } from "@/data/features-data";

interface TechnicalHighlightsProps {
  readonly highlights: readonly TechnicalHighlight[];
  readonly isInView: boolean;
}

const iconMap = {
  Clock,
  Shield,
  BarChart3,
};

export default function TechnicalHighlights({
  highlights,
  isInView,
}: TechnicalHighlightsProps) {
  return (
    <motion.div
      className="mt-16 grid md:grid-cols-3 gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 1.0 }}
    >
      {highlights.map((highlight, index) => {
        const IconComponent = iconMap[highlight.icon as keyof typeof iconMap];

        return (
          <Card
            key={highlight.title}
            className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg"
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 bg-gradient-to-br ${highlight.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                {IconComponent && (
                  <IconComponent className="h-8 w-8 text-white" />
                )}
              </div>
              <h4 className="text-xl font-raleway font-semibold mb-2 text-forest">
                {highlight.title}
              </h4>
              <p className="font-hammersmith text-forest/80">
                {highlight.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </motion.div>
  );
}
