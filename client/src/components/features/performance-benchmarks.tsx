import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AnimatedCounter from '@/components/animated-counter';
import { PerformanceMetric } from '@/data/features-data';

interface PerformanceBenchmarksProps {
  metrics: PerformanceMetric[];
  isInView: boolean;
  title: string;
  highlight: string;
  description: string;
}

export default function PerformanceBenchmarks({ 
  metrics, 
  isInView, 
  title, 
  highlight, 
  description 
}: PerformanceBenchmarksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-raleway font-semibold text-forest mb-2">
              {title} <span className="text-sage">{highlight}</span>
            </h3>
            <p className="text-forest/70 font-hammersmith">
              {description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="mb-4">
                  <div className="text-3xl font-raleway font-bold text-sage mb-1">
                    <AnimatedCounter to={metric.value} />
                    <span className="text-lg">{metric.unit}</span>
                  </div>
                  <div className="text-sm font-hammersmith text-forest/70 mb-3">{metric.label}</div>
                  <Progress 
                    value={metric.value} 
                    className="h-2 bg-sage/20"
                    style={{
                      background: 'linear-gradient(to right, hsl(var(--sage)), hsl(var(--medium-forest)))'
                    }}
                  />
                </div>
                <div className="text-xs text-forest/50 font-hammersmith">{metric.comparison}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}