import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HeroSectionSkeleton() {
  return (
    <section className="relative h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-mint">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Title Skeleton - Matches actual hero text dimensions */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-sage/15 rounded-full border border-sage/30 mb-8 backdrop-blur-sm">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-20 w-full max-w-4xl mx-auto mb-4" />
          <Skeleton className="h-16 w-5/6 max-w-3xl mx-auto" />
        </div>

        {/* Description Skeleton - Matches actual paragraph */}
        <div className="mb-12">
          <Skeleton className="h-6 w-full max-w-5xl mx-auto mb-3" />
          <Skeleton className="h-6 w-4/5 max-w-5xl mx-auto mb-3" />
          <Skeleton className="h-6 w-3/4 max-w-5xl mx-auto" />
        </div>

        {/* Metrics Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card
              key={i}
              className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg"
            >
              <CardContent className="p-4 lg:p-6 text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons Skeleton - Matches actual layout */}
        <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-20">
          <Skeleton className="h-16 w-80 rounded-xl" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-56 rounded-lg" />
            <Skeleton className="h-12 w-56 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSectionSkeleton() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-mint/30 to-mint">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-2/3 mx-auto mb-6" />
          <Skeleton className="h-6 w-3/4 max-w-3xl mx-auto" />
        </div>

        {/* Features Grid Skeleton */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card
              key={i}
              className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg"
            >
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <Skeleton className="w-16 h-16 rounded-2xl" />
                  <div className="text-right">
                    <Skeleton className="h-6 w-16 mb-1" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-4 w-4/5" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Chart Skeleton */}
        <Card className="bg-white/95 backdrop-blur-md border-sage/20 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Skeleton className="h-8 w-1/2 mx-auto mb-2" />
              <Skeleton className="h-5 w-2/3 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="h-12 w-16 mx-auto mb-4" />
                  <Skeleton className="h-4 w-20 mx-auto mb-3" />
                  <Skeleton className="h-2 w-full mb-2" />
                  <Skeleton className="h-3 w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export function SectionLoadingSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-5 w-3/4 mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SpinnerLoader({
  size = "default",
  className = "",
  label = "Loading...",
}: {
  size?: "sm" | "default" | "lg";
  className?: string;
  label?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    default: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-live="polite">
      <div 
        className={`animate-spin rounded-full border-solid border-sage/30 border-t-dark-forest ${sizeClasses[size]}`} 
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function FloatingLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loading-message"
    >
      <div className="text-center p-6 rounded-lg bg-white/10 dark:bg-gray-800/20 backdrop-blur-md shadow-lg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-3 border-sage/30 border-t-dark-forest rounded-full mx-auto mb-4"
          aria-hidden="true"
        />
        <p id="loading-message" className="text-gray-900 dark:text-gray-100 font-medium">{message}</p>
      </div>
    </motion.div>
  );
}
