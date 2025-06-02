import React from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import TechComponentCard from "@/components/tech-stack/tech-component-card";
import { techComponents } from "@/components/tech-stack/tech-data";

export default function TechStackSection() {
  const sectionRef = React.useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [expandedComponent, setExpandedComponent] = React.useState<string | null>(
    null,
  );

  const handleToggle = React.useCallback((id: string) => {
    setExpandedComponent(prev => prev === id ? null : id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-mint/30 via-white to-sage/20 relative overflow-hidden"
      aria-labelledby="tech-stack-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="tech-stack-heading"
            className="text-4xl md:text-5xl font-bold text-dark-forest mb-6 font-raleway"
          >
            Technology Stack
          </h2>
          <p className="text-xl text-forest/80 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge blockchain technology powering the future of
            decentralized applications
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {techComponents.map((component, index) => (
            <TechComponentCard
              key={component.id}
              {...component}
              isExpanded={expandedComponent === component.id}
              onToggle={handleToggle}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}