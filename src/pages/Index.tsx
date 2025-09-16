import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { MarketplaceGrid } from "@/components/ui/marketplace-grid";
import { FeaturesSection } from "@/components/ui/features-section";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <MarketplaceGrid />
      <FeaturesSection />
    </div>
  );
};

export default Index;
