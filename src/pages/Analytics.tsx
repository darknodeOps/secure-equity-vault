import { Navbar } from "@/components/ui/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, Users, PieChart, BarChart3, Activity, Shield } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-background/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Market Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time insights into the confidential RWA lending market. Track performance, trends, and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Value Locked</p>
                    <p className="text-2xl font-bold text-foreground">$2.4B</p>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-secure" />
                      <span className="text-secure">+12.5%</span>
                    </div>
                  </div>
                  <DollarSign className="h-8 w-8 text-secure" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Loans</p>
                    <p className="text-2xl font-bold text-foreground">1,247</p>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-trust" />
                      <span className="text-trust">+8.3%</span>
                    </div>
                  </div>
                  <Activity className="h-8 w-8 text-trust" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Average APY</p>
                    <p className="text-2xl font-bold text-foreground">6.8%</p>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      <span className="text-destructive">-0.2%</span>
                    </div>
                  </div>
                  <PieChart className="h-8 w-8 text-value" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Users</p>
                    <p className="text-2xl font-bold text-foreground">18,392</p>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      <span className="text-accent">+15.7%</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="lending">Lending Trends</TabsTrigger>
              <TabsTrigger value="assets">Asset Performance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-secure" />
                      Monthly Volume
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Volume Chart Placeholder</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-trust" />
                      Asset Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Commercial Real Estate</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-secure h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Residential Property</span>
                        <span className="font-semibold">32%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-trust h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Industrial Assets</span>
                        <span className="font-semibold">23%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-value h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="lending" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Interest Rate Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <p className="text-3xl font-bold text-secure">5.2%</p>
                      <p className="text-muted-foreground">Current Average Rate</p>
                      <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground text-sm">Rate Chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Loan Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">12 months</span>
                        <span className="font-semibold">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">24 months</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">36 months</span>
                        <span className="font-semibold">27%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Default Rates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <p className="text-3xl font-bold text-trust">0.3%</p>
                      <p className="text-muted-foreground">Historical Default Rate</p>
                      <p className="text-sm text-secure">Industry Leading</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Top Performing Asset Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Tech Office Buildings", return: "8.2%", volume: "$450M" },
                      { category: "Luxury Residential", return: "7.8%", volume: "$320M" },
                      { category: "Industrial Warehouses", return: "6.9%", volume: "$280M" },
                      { category: "Retail Centers", return: "5.5%", volume: "$190M" },
                    ].map((asset, index) => (
                      <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{asset.category}</p>
                          <p className="text-sm text-muted-foreground">Volume: {asset.volume}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-secure">{asset.return}</p>
                          <p className="text-sm text-muted-foreground">Avg. Return</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-secure" />
                      Privacy Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Zero-Knowledge Verifications</span>
                        <span className="font-bold text-secure">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Encrypted Transactions</span>
                        <span className="font-bold text-secure">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Breaches</span>
                        <span className="font-bold text-trust">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Security Audits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <p className="font-semibold">Latest Audit: Q4 2024</p>
                        <p className="text-sm text-muted-foreground">Rating: A+ Security</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Analytics;