import { Button } from "@/components/ui/button";
import { Wallet, Globe, FileText, CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "@/assets/trade-finance-logo.png";

const Header = () => {
  const location = useLocation();

  return (
    <header className="relative w-full bg-gradient-ocean shadow-ocean border-b border-border">
      <div className="absolute inset-0 bg-encrypted-grid bg-encrypted opacity-10" />
      
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={logo} 
                alt="Trade Finance Network" 
                className="w-12 h-12 rounded-lg shadow-secure animate-float"
              />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-white">
                Confidential Global Trade Settlement
              </h1>
              <p className="text-ocean-mist text-sm">
                Encrypted Letters of Credit & Invoice Validation
              </p>
            </div>
          </div>

          {/* Navigation and Wallet */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/dashboard" 
                className={`transition-smooth flex items-center gap-2 ${
                  location.pathname === '/dashboard' ? 'text-white' : 'text-ocean-mist hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                Dashboard
              </Link>
              <Link 
                to="/documents" 
                className={`transition-smooth flex items-center gap-2 ${
                  location.pathname === '/documents' ? 'text-white' : 'text-ocean-mist hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                Documents
              </Link>
              <Link 
                to="/validation" 
                className={`transition-smooth flex items-center gap-2 ${
                  location.pathname === '/validation' ? 'text-white' : 'text-ocean-mist hover:text-white'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Validation
              </Link>
            </nav>

            <ConnectButton 
              chainStatus="icon"
              showBalance={false}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;