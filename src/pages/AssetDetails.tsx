import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, DollarSign, TrendingUp, Shield, Lock, Eye, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import property1 from "@/assets/property-1.jpg";

const AssetDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Button>
        </div>
      </section>

      {/* Asset Header */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Asset Image */}
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden shadow-elevated">
                <img 
                  src={property1} 
                  alt="Premium Office Complex"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={property1} 
                      alt={`Property view ${i}`}
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">Premium Office Complex</h1>
                  <Badge variant="outline" className="text-secure border-secure">
                    AAA Rated
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>Manhattan, New York, NY</span>
                </div>
                <p className="text-lg text-muted-foreground">
                  Premium commercial office space in the heart of Manhattan's financial district. 
                  Recently renovated with modern amenities and high-end finishes.
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-6 w-6 mx-auto mb-2 text-secure" />
                    <p className="text-2xl font-bold text-secure">5.2%</p>
                    <p className="text-sm text-muted-foreground">Current APY</p>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-trust" />
                    <p className="text-2xl font-bold text-trust">24</p>
                    <p className="text-sm text-muted-foreground">Months Term</p>
                  </CardContent>
                </Card>
              </div>

              {/* Lending Progress */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Lending Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>$1,950,000 of $2,500,000 target</span>
                      <span className="text-secure font-semibold">78% funded</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div className="bg-secure h-3 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Min. investment: $50,000</span>
                      <span>54 lenders</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 bg-secure hover:bg-secure/90">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Lend Now
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Eye className="h-5 w-5 mr-2" />
                  Watch Asset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Asset Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Asset Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    This premier office complex represents one of Manhattan's most sought-after commercial properties. 
                    Located in the prestigious financial district, the building offers state-of-the-art facilities, 
                    premium finishes, and exceptional access to transportation networks.
                  </p>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Property Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Building Type:</span>
                          <span>Class A Office</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Year Built:</span>
                          <span>2018</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Floors:</span>
                          <span>42</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Occupancy:</span>
                          <span>95%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Financial Metrics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Loan-to-Value:</span>
                          <span>65%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Debt Service Coverage:</span>
                          <span>1.8x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">NOI Growth:</span>
                          <span className="text-secure">+12% YoY</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cap Rate:</span>
                          <span>4.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-secure" />
                    Performance History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Performance Chart Placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-secure" />
                    Privacy Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-trust mt-1" />
                    <div>
                      <h4 className="font-semibold">Encrypted Valuation</h4>
                      <p className="text-sm text-muted-foreground">Asset value verified through zero-knowledge proofs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-value mt-1" />
                    <div>
                      <h4 className="font-semibold">Confidential Documentation</h4>
                      <p className="text-sm text-muted-foreground">Sensitive financial data remains private</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Lender Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Institutional</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-secure h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>High Net Worth</span>
                      <span className="font-semibold">22%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-trust h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Retail</span>
                      <span className="font-semibold">10%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-value h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Credit Risk</span>
                      <Badge variant="outline" className="text-secure border-secure">Low</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Market Risk</span>
                      <Badge variant="outline" className="text-trust border-trust">Low</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Liquidity Risk</span>
                      <Badge variant="outline" className="text-value border-value">Medium</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetDetails;