import { Navbar } from "@/components/ui/navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { MarketplaceGrid } from "@/components/ui/marketplace-grid";
import { FeaturesSection } from "@/components/ui/features-section";
import { EncryptedDataManager } from "@/components/EncryptedDataManager";
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      
      {/* Show encrypted data manager only when wallet is connected */}
      {isConnected && (
        <div className="container mx-auto px-4 py-8">
          <EncryptedDataManager />
        </div>
      )}
      
      <MarketplaceGrid />
      <FeaturesSection />
    </div>
  );
};

export default Index;
