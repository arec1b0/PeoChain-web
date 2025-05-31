import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import TrilemmaSection from '@/components/trilemma-section';
import FeaturesSection from '@/components/features-section';
import AccessibilitySection from '@/components/accessibility-section';
import TechnologySection from '@/components/technology-section';
import FooterSection from '@/components/footer-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <TrilemmaSection />
      <FeaturesSection />
      <AccessibilitySection />
      <TechnologySection />
      <FooterSection />
    </div>
  );
}
