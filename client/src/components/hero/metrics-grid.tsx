import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedCounter from '@/components/animated-counter';
import { HeroMetric } from '@/data/hero-data';

interface MetricsGridProps {
  metrics: HeroMetric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
          <CardContent className="p-4 lg:p-6 text-center">
            {typeof metric.value === 'number' && metric.value > 1 ? (
              <AnimatedCounter 
                to={metric.value}
                suffix={metric.suffix}
                className={`text-2xl lg:text-3xl font-raleway font-semibold mb-2 ${metric.className}`}
              />
            ) : (
              <div className={`text-2xl lg:text-3xl font-raleway font-semibold mb-2 ${metric.className}`}>
                {metric.label === "Avg. Fees" ? "USD 0.04" : metric.value}{metric.suffix}
              </div>
            )}
            <div className="text-sm lg:text-base font-hammersmith text-forest/70">
              {metric.label}
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}