import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, TrendingUp, Clock, Star } from "lucide-react";

const lendingOpportunities = [
  {
    id: 1,
    title: "Manhattan Commercial Property",
    location: "New York, NY",
    apr: "5.2%",
    term: "24 months",
    minAmount: "$50,000",
    totalNeeded: "$2,500,000",
    funded: "78%",
    rating: "AAA",
    riskLevel: "Low",
  },
  {
    id: 2,
    title: "Tech Office Complex",
    location: "San Francisco, CA",
    apr: "6.8%",
    term: "18 months", 
    minAmount: "$25,000",
    totalNeeded: "$1,800,000",
    funded: "45%",
    rating: "AA",
    riskLevel: "Medium",
  },
  {
    id: 3,
    title: "Luxury Residential Portfolio",
    location: "Miami, FL",
    apr: "7.5%",
    term: "36 months",
    minAmount: "$100,000", 
    totalNeeded: "$4,200,000",
    funded: "23%",
    rating: "A",
    riskLevel: "Medium",
  },
];

const Lend = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-background/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Secure Lending
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Earn competitive returns by lending against verified real-world assets. Your capital is protected by confidential collateral verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secure hover:bg-secure/90">
                <Wallet className="h-5 w-5 mr-2" />
                Start Lending
              </Button>
              <Button variant="outline" size="lg">
                View Portfolio
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <TrendingUp className="h-8 w-8 text-secure mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">8.2%</h3>
              <p className="text-muted-foreground">Average APY</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <Shield className="h-8 w-8 text-trust mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">99.7%</h3>
              <p className="text-muted-foreground">Recovery Rate</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <Clock className="h-8 w-8 text-value mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">24 hrs</h3>
              <p className="text-muted-foreground">Avg. Processing</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-foreground">4.9/5</h3>
              <p className="text-muted-foreground">Lender Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lending Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Current Lending Opportunities
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {lendingOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="shadow-card hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <Badge variant={opportunity.riskLevel === "Low" ? "default" : opportunity.riskLevel === "Medium" ? "secondary" : "destructive"}>
                      {opportunity.riskLevel}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{opportunity.location}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">APR</span>
                      <span className="font-semibold text-secure">{opportunity.apr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Term</span>
                      <span className="font-semibold">{opportunity.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min. Amount</span>
                      <span className="font-semibold">{opportunity.minAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <Badge variant="outline">{opportunity.rating}</Badge>
                    </div>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Funded</span>
                        <span className="text-muted-foreground">{opportunity.funded}</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-secure h-2 rounded-full" 
                          style={{ width: opportunity.funded }}
                        ></div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      Lend Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Lend;