import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Zap, TrendingUp, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Military-Grade Encryption",
    description: "Asset valuations are encrypted with AES-256 encryption, ensuring borrower privacy while maintaining transparency.",
    color: "secure",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Verification",
    description: "Verify asset authenticity without revealing sensitive financial information using advanced cryptographic proofs.",
    color: "trust",
  },
  {
    icon: Eye,
    title: "Privacy-First Design",
    description: "Your financial data remains confidential. Only you control what information is shared with lenders.",
    color: "value",
  },
  {
    icon: Zap,
    title: "Instant Liquidity",
    description: "Access immediate funding against your tokenized real-world assets without lengthy approval processes.",
    color: "accent",
  },
  {
    icon: TrendingUp,
    title: "Competitive Rates",
    description: "Market-driven interest rates ensure fair pricing for both borrowers and lenders.",
    color: "secure",
  },
  {
    icon: Users,
    title: "Decentralized Network",
    description: "Connect directly with a global network of lenders without traditional banking intermediaries.",
    color: "trust",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose SecureRWA?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced privacy protection meets institutional-grade lending infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className={`p-3 bg-${feature.color} rounded-lg inline-block mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-6 w-6 text-${feature.color}-foreground`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}