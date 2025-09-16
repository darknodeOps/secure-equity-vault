import { Button } from "@/components/ui/button";
import { Wallet, Shield, Building2, Menu } from "lucide-react";
import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-secure rounded-lg">
              <Building2 className="h-6 w-6 text-secure-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SecureRWA</h1>
              <p className="text-xs text-muted-foreground">Confidential Assets</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/marketplace" className="text-foreground hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="/lend" className="text-foreground hover:text-primary transition-colors">
              Lend
            </a>
            <a href="/borrow" className="text-foreground hover:text-primary transition-colors">
              Borrow
            </a>
            <a href="/analytics" className="text-foreground hover:text-primary transition-colors">
              Analytics
            </a>
          </div>

          {/* Wallet Connect */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Privacy First
            </Button>
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <a href="/marketplace" className="text-foreground hover:text-primary transition-colors">
                Marketplace
              </a>
              <a href="/lend" className="text-foreground hover:text-primary transition-colors">
                Lend
              </a>
              <a href="/borrow" className="text-foreground hover:text-primary transition-colors">
                Borrow
              </a>
              <a href="/analytics" className="text-foreground hover:text-primary transition-colors">
                Analytics
              </a>
              <div className="pt-3 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy First
                </Button>
                <div className="w-full">
                  <WalletConnect />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}