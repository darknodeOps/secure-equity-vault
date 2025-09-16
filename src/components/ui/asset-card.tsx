import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Lock, TrendingUp, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AssetCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  type: string;
  encryptedValue: string;
  availableLiquidity: string;
  apy: string;
  ltv: string;
  isVerified: boolean;
}

export function AssetCard({
  id,
  title,
  location,
  image,
  type,
  encryptedValue,
  availableLiquidity,
  apy,
  ltv,
  isVerified,
}: AssetCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden bg-card shadow-card hover:shadow-elevated transition-all duration-300 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {type}
          </Badge>
          {isVerified && (
            <div className="p-1 bg-secure rounded-full shadow-secure">
              <Shield className="h-3 w-3 text-secure-foreground" />
            </div>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <div className="p-2 bg-background/90 backdrop-blur-sm rounded-full">
            <Lock className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">{title}</h3>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Encrypted Value</span>
            <div className="flex items-center">
              <Lock className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="font-mono text-sm">{"*".repeat(8)}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Available</span>
            <span className="font-semibold text-foreground">{availableLiquidity}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-muted-foreground">APY</span>
              <div className="flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-accent" />
                <span className="font-semibold text-accent">{apy}</span>
              </div>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Max LTV</span>
              <div className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1 text-value" />
                <span className="font-semibold text-value">{ltv}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => navigate(`/asset/${id}`)}
        >
          View Details
        </Button>
        <Button variant="secure" size="sm" className="flex-1">
          <Shield className="h-4 w-4 mr-1" />
          Secure Lend
        </Button>
      </CardFooter>
    </Card>
  );
}