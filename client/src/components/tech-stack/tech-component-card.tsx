import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TechComponentDetails {
  overview: string;
  features: string[];
  metrics: Record<string, string>;
}

interface TechComponentCardProps {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  details: TechComponentDetails;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  index: number;
  isInView: boolean;
}

const TechComponentCard: React.FC<TechComponentCardProps> = React.memo(
  ({
    id,
    icon: Icon,
    title,
    subtitle,
    description,
    gradient,
    details,
    isExpanded,
    onToggle,
    index,
    isInView,
  }) => {
    const handleToggle = React.useCallback(() => {
      onToggle(id);
    }, [id, onToggle]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden border border-sage/20 hover:border-sage/40 transition-all duration-300 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className={`h-2 ${gradient}`} />
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-xl bg-sage/10 flex-shrink-0">
                  <Icon className="w-6 h-6 text-sage" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-dark-forest font-raleway">
                      {title}
                    </h3>
                    <span className="text-sm text-sage font-medium px-2 py-1 bg-sage/10 rounded-full">
                      {subtitle}
                    </span>
                  </div>
                  <p className="text-forest/80 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>

              <Collapsible open={isExpanded} onOpenChange={handleToggle}>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full flex items-center justify-between p-3 hover:bg-sage/5 text-sage"
                    aria-expanded={isExpanded}
                    aria-controls={`tech-details-${id}`}
                  >
                    <span className="font-medium">
                      {isExpanded ? "Hide Details" : "Show Details"}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent
                  id={`tech-details-${id}`}
                  className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
                >
                  <div className="pt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-dark-forest mb-2">
                        Overview
                      </h4>
                      <p className="text-forest/80 text-sm leading-relaxed">
                        {details.overview}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-dark-forest mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-1">
                        {details.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-forest/80 text-sm flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-dark-forest mb-2">
                        Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(details.metrics).map(([key, value]) => (
                          <div key={key} className="bg-sage/5 rounded-lg p-3">
                            <div className="text-xs text-forest/60 mb-1">
                              {key}
                            </div>
                            <div className="font-bold text-sage">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  },
);

TechComponentCard.displayName = "TechComponentCard";

export default TechComponentCard;
