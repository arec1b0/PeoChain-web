import React from "react";
import { Progress } from "@/components/ui/progress";

interface NavigationProgressProps {
  isScrolled: boolean;
  scrollProgress: number;
}

export const NavigationProgress: React.FC<NavigationProgressProps> = ({
  isScrolled,
  scrollProgress,
}) => {
  if (!isScrolled) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <Progress
        value={scrollProgress}
        className="h-1 rounded-none bg-transparent"
        aria-hidden="true"
      />
    </div>
  );
};