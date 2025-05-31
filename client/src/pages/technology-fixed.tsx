import Navigation from '@/components/navigation';
import TechStackSection from '@/components/tech-stack-section';
import TechnologySection from '@/components/technology-section';

export default function Technology() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 bg-mint">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-raleway font-bold text-forest mb-6">
              Technology Stack
            </h1>
            <p className="text-xl font-hammersmith text-forest/80 max-w-3xl mx-auto">
              Discover the innovative technologies powering PeoChain's revolutionary blockchain platform
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Technology Stack Section */}
      <TechStackSection />
      
      {/* Revolutionary Technology Section */}
      <TechnologySection />
    </div>
  );
}