import { AssetCard } from "./asset-card";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const mockAssets = [
  {
    id: "1",
    title: "Prime Downtown Office Complex",
    location: "Manhattan, New York",
    image: property2,
    type: "Commercial",
    encryptedValue: "***encrypted***",
    availableLiquidity: "$2.4M",
    apy: "5.2%",
    ltv: "75%",
    isVerified: true,
  },
  {
    id: "2",
    title: "Luxury Residential Building",
    location: "Beverly Hills, CA",
    image: property1,
    type: "Residential",
    encryptedValue: "***encrypted***",
    availableLiquidity: "$1.8M",
    apy: "4.8%",
    ltv: "70%",
    isVerified: true,
  },
  {
    id: "3",
    title: "Industrial Warehouse Complex",
    location: "Austin, Texas",
    image: property3,
    type: "Industrial",
    encryptedValue: "***encrypted***",
    availableLiquidity: "$3.2M",
    apy: "6.1%",
    ltv: "80%",
    isVerified: true,
  },
  {
    id: "4",
    title: "Tech Campus Building",
    location: "San Francisco, CA",
    image: property2,
    type: "Commercial",
    encryptedValue: "***encrypted***",
    availableLiquidity: "$4.1M",
    apy: "4.5%",
    ltv: "65%",
    isVerified: true,
  },
  {
    id: "5",
    title: "Retail Shopping Center",
    location: "Miami, Florida",
    image: property1,
    type: "Retail",
    encryptedValue: "***encrypted***",
    availableLiquidity: "$1.5M",
    apy: "5.8%",
    ltv: "72%",
    isVerified: true,
  },
  {
    id: "6",
    title: "Medical Office Building",
    location: "Chicago, Illinois",
    image: property3,
    type: "Healthcare",
    encryptedValue: "***encrypted***",
    availableLiquidity: "$2.7M",
    apy: "4.3%",
    ltv: "68%",
    isVerified: true,
  },
];

export function MarketplaceGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Tokenized Asset Marketplace
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore verified real-world assets with encrypted valuations. Lend securely or tokenize your own assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAssets.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </section>
  );
}