import { motion } from "framer-motion";
import { FloatingNode } from "@/data/hero-data";

interface FloatingBackgroundProps {
  nodes: FloatingNode[];
}

export default function FloatingBackground({ nodes }: FloatingBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute gradient-sage-forest rounded-full opacity-60"
          style={{
            width: node.size,
            height: node.size,
            ...node.position,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
