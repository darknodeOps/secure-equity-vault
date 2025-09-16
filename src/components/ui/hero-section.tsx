import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, TrendingUp, DollarSign } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBuilding}
          alt="Modern real estate building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero opacity-90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-secure rounded-full shadow-secure">
              <Shield className="h-8 w-8 text-secure-foreground" />
            </div>
            <span className="px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium text-foreground">
              Privacy-First Lending
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Real Assets,{" "}
            <span className="bg-value text-value-foreground px-4 py-2 rounded-lg inline-block">
              Confidential
            </span>{" "}
            Financing.
          </h1>

          <p className="text-xl lg:text-2xl text-primary-foreground/80 mb-8 max-w-2xl">
            Tokenize real-world assets as collateral while keeping valuations encrypted to protect your privacy. Secure, transparent, and confidential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" variant="secure" className="text-lg px-8 py-6">
              <Lock className="h-5 w-5 mr-2" />
              Start Borrowing
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore Lending
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-background/90 backdrop-blur-sm shadow-card">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-value rounded-lg">
                  <DollarSign className="h-5 w-5 text-value-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">$12.5M</p>
                  <p className="text-sm text-muted-foreground">Total Value Locked</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background/90 backdrop-blur-sm shadow-card">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secure rounded-lg">
                  <Shield className="h-5 w-5 text-secure-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">256</p>
                  <p className="text-sm text-muted-foreground">Encrypted Assets</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-background/90 backdrop-blur-sm shadow-card">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-trust rounded-lg">
                  <TrendingUp className="h-5 w-5 text-trust-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.2%</p>
                  <p className="text-sm text-muted-foreground">Average APY</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}