import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Lock, Shield, Calculator, CheckCircle } from "lucide-react";

const borrowingSteps = [
  {
    step: 1,
    title: "Submit Asset Details",
    description: "Upload encrypted asset documentation and valuation reports",
    icon: Upload,
  },
  {
    step: 2,
    title: "Privacy Verification",
    description: "Our zero-knowledge protocol verifies your assets without exposing sensitive data",
    icon: Shield,
  },
  {
    step: 3,
    title: "Receive Offers",
    description: "Get competitive lending offers from our network of institutional lenders",
    icon: Calculator,
  },
  {
    step: 4,
    title: "Secure Funding",
    description: "Accept the best offer and receive instant liquidity while maintaining privacy",
    icon: CheckCircle,
  },
];

const Borrow = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-background/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Confidential Borrowing
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Unlock liquidity from your real-world assets while keeping your financial information private. Get competitive rates with zero-knowledge verification.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            How Confidential Borrowing Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {borrowingSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <Card key={step.step} className="text-center shadow-card">
                  <CardContent className="p-6">
                    <div className="bg-secure rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-secure-foreground" />
                    </div>
                    <div className="bg-secure text-secure-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Borrowing Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Start Your Borrowing Application
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Application Form */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-secure" />
                    Confidential Application
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="asset-type">Asset Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial Real Estate</SelectItem>
                        <SelectItem value="residential">Residential Property</SelectItem>
                        <SelectItem value="industrial">Industrial Property</SelectItem>
                        <SelectItem value="land">Land/Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loan-amount">Requested Loan Amount</Label>
                    <Input id="loan-amount" placeholder="$500,000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loan-term">Preferred Loan Term</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select term" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="asset-location">Asset Location</Label>
                    <Input id="asset-location" placeholder="City, State" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Asset Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Brief description of your asset..."
                      rows={3}
                    />
                  </div>
                  
                  <Button className="w-full bg-secure hover:bg-secure/90">
                    Submit Application
                  </Button>
                </CardContent>
              </Card>

              {/* Benefits */}
              <div className="space-y-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Why Choose SecureRWA?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-secure mt-1" />
                      <div>
                        <h4 className="font-semibold">Complete Privacy</h4>
                        <p className="text-sm text-muted-foreground">Your asset details remain encrypted and confidential</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calculator className="h-5 w-5 text-trust mt-1" />
                      <div>
                        <h4 className="font-semibold">Competitive Rates</h4>
                        <p className="text-sm text-muted-foreground">Market-driven rates from 3.5% - 12% APR</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-value mt-1" />
                      <div>
                        <h4 className="font-semibold">Fast Processing</h4>
                        <p className="text-sm text-muted-foreground">Get funding in 24-48 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Loan Calculator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-secure">4.5%</p>
                        <p className="text-sm text-muted-foreground">Starting APR</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-trust">80%</p>
                        <p className="text-sm text-muted-foreground">Max LTV</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      Calculate Payment
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Borrow;