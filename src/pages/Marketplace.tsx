import { Navbar } from "@/components/ui/navbar";
import { MarketplaceGrid } from "@/components/ui/marketplace-grid";
import { Button } from "@/components/ui/button";
import { Search, Filter, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-background/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Asset Marketplace
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover premium real-world assets available for lending. Browse through verified properties with confidential valuations.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto flex gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search properties..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg p-6 shadow-card">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-secure" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">$2.4B</h3>
                <p className="text-muted-foreground">Total Asset Value</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h3 className="text-2xl font-bold text-foreground">1,247</h3>
                <p className="text-muted-foreground">Active Assets</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-card">
                <h3 className="text-2xl font-bold text-foreground">4.2%</h3>
                <p className="text-muted-foreground">Avg. APY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarketplaceGrid />
    </div>
  );
};

export default Marketplace;