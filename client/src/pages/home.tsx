import React from "react";
import MainLayout from "@/components/layout/main-layout";
import {
  ErrorBoundaryEnhanced,
  DefaultErrorFallback,
} from "@/components/ui/error-boundary-enhanced";
import { SectionLoadingSkeleton } from "@/components/ui/loading-states";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import TrilemmaSection from "@/components/trilemma-section";
import FeaturesSection from "@/components/features-section";
import FooterSection from "@/components/footer-section";

const Home: React.FC = () => {
  const { Suspense } = React;

  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
    </MainLayout>
  );
};

export default Home;
