import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AnimatedCounter from "@/components/animated-counter";
import { HeroMetric } from "@/data/hero-data";
import { useReducedMotion } from "@/hooks/use-accessibility";

interface MetricsGridProps {
  readonly metrics: readonly HeroMetric[];
}

const MetricCard = memo<{
  readonly metric: HeroMetric;
  readonly index: number;
  readonly prefersReducedMotion: boolean;
}>(({ metric, index, prefersReducedMotion }) => {
  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3 + index * 0.1 },
      };

  const ariaLabel =
    metric.ariaLabel ||
    `${metric.label}: ${metric.value}${metric.suffix || ""}`;

  return (
    <motion.div {...animationProps}>
      <Card
        className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg hover:shadow-xl transition-shadow duration-300"
        role="img"
        aria-label={ariaLabel}
      >
        <CardContent className="p-4 lg:p-6 text-center">
          {typeof metric.value === "number" && metric.value > 1 ? (
            <AnimatedCounter
              to={metric.value}
              suffix={metric.suffix}
              className={`text-2xl lg:text-3xl font-raleway font-semibold mb-2 ${metric.className}`}
              aria-label={ariaLabel}
            />
          ) : (
            <div
              className={`text-2xl lg:text-3xl font-raleway font-semibold mb-2 ${metric.className}`}
              aria-label={ariaLabel}
            >
              {metric.label === "Avg. Fees" ? "USD 0.04" : metric.value}
              {metric.suffix}
            </div>
          )}
          <div className="text-sm lg:text-base font-hammersmith text-forest/70">
            {metric.label}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

MetricCard.displayName = "MetricCard";

const MetricsGrid = memo<MetricsGridProps>(({ metrics }) => {
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.3 },
      };

  const memoizedMetrics = useMemo(
    () =>
      metrics.map((metric, index) => (
        <MetricCard
          key={`${metric.label}-${index}`}
          metric={metric}
          index={index}
          prefersReducedMotion={prefersReducedMotion}
        />
      )),
    [metrics, prefersReducedMotion],
  );

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
      {...animationProps}
      role="region"
      aria-label="Performance metrics"
    >
      {memoizedMetrics}
    </motion.div>
  );
});

MetricsGrid.displayName = "MetricsGrid";

export default MetricsGrid;
