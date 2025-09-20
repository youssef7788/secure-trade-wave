import { Anchor, Ship } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative w-full bg-gradient-ocean overflow-hidden">
      {/* Animated Wave Pattern */}
      <div className="absolute inset-0">
        <svg 
          viewBox="0 0 1200 120" 
          className="absolute bottom-0 w-full h-20 text-ocean-secondary animate-wave"
          fill="currentColor"
        >
          <path d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z" />
        </svg>
        <svg 
          viewBox="0 0 1200 120" 
          className="absolute bottom-0 w-full h-24 text-tech-teal/50 animate-wave"
          style={{ animationDelay: '1s', animationDuration: '6s' }}
          fill="currentColor"
        >
          <path d="M0,80 C400,40 800,100 1200,80 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Encrypted Grid Overlay */}
      <div className="absolute inset-0 bg-encrypted-grid bg-encrypted opacity-10" />

      {/* Animated Ships */}
      <div className="absolute top-8 w-full h-12 overflow-hidden">
        <Ship className="absolute w-8 h-8 text-maritime-gold animate-ship" style={{ animationDelay: '0s' }} />
        <Ship className="absolute w-6 h-6 text-maritime-gold-light animate-ship" style={{ animationDelay: '8s', top: '20px' }} />
        <Ship className="absolute w-7 h-7 text-ocean-mist animate-ship" style={{ animationDelay: '15s', top: '10px' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Anchor className="w-8 h-8 text-maritime-gold" />
              <div>
                <h3 className="text-xl font-bold text-white">Trade Finance Network</h3>
                <p className="text-ocean-mist text-sm">Encrypted. Secure. Global.</p>
              </div>
            </div>
            <p className="text-ocean-mist mb-4 max-w-md">
              Revolutionizing international trade finance through blockchain encryption, 
              ensuring secure and fraud-resistant letter of credit processing worldwide.
            </p>
            <div className="flex items-center gap-2 text-tech-cyan">
              <div className="w-2 h-2 bg-secure-green rounded-full animate-pulse" />
              <span className="text-sm font-medium">Network Status: Online & Secure</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-ocean-mist text-sm">
              <li><a href="#" className="hover:text-white transition-smooth">Letter of Credit</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Invoice Validation</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Trade Finance</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Document Security</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Compliance</h4>
            <ul className="space-y-2 text-ocean-mist text-sm">
              <li><a href="#" className="hover:text-white transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Regulatory Info</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Security Audit</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ocean-secondary/30 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-ocean-mist text-sm">
            © 2024 Encrypted Trade Finance Network. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-ocean-mist text-xs">Powered by Blockchain</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-tech-cyan rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;