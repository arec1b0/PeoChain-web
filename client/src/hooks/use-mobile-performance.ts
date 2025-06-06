
import React from "react";
import { useIsMobile } from "./use-mobile";

interface MobilePerformanceOptions {
  reducedMotion?: boolean;
  lazyImages?: boolean;
  prefersReducedData?: boolean;
}

export function useMobilePerformance(options: MobilePerformanceOptions = {}) {
  const isMobile = useIsMobile();
  const [preferences, setPreferences] = React.useState({
    reducedMotion: false,
    prefersReducedData: false,
    connectionType: "unknown",
  });

  React.useEffect(() => {
    if (!isMobile) return;

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = () => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: mediaQuery.matches,
      }));
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    handleMotionChange();

    // Check network connection type
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      const updateConnection = () => {
        setPreferences(prev => ({
          ...prev,
          connectionType: connection.effectiveType || "unknown",
          prefersReducedData: connection.saveData || connection.effectiveType === "slow-2g",
        }));
      };

      connection.addEventListener("change", updateConnection);
      updateConnection();

      return () => {
        mediaQuery.removeEventListener("change", handleMotionChange);
        connection.removeEventListener("change", updateConnection);
      };
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [isMobile]);

  // Return optimized settings based on device capabilities
  return {
    shouldReduceMotion: options.reducedMotion ?? preferences.reducedMotion,
    shouldLazyLoad: options.lazyImages ?? (isMobile || preferences.prefersReducedData),
    shouldPreloadImages: !preferences.prefersReducedData && !isMobile,
    connectionType: preferences.connectionType,
    isSlowConnection: preferences.connectionType === "slow-2g" || preferences.connectionType === "2g",
    prefersReducedData: preferences.prefersReducedData,
    isMobile,
  };
}
