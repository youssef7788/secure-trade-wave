import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, Lock, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DocumentDetails from "./DocumentDetails";

const TradingBoard = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();
  const documents = [
    {
      id: "LC-2024-001",
      type: "Letter of Credit",
      amount: "$2,500,000",
      currency: "USD",
      status: "validated",
      issuer: "HSBC Singapore",
      beneficiary: "Global Maritime Corp",
      expiry: "2024-12-31",
      encrypted: true,
    },
    {
      id: "INV-2024-142",
      type: "Commercial Invoice",
      amount: "$890,000",
      currency: "EUR",
      status: "pending",
      issuer: "Shipping Solutions Ltd",
      beneficiary: "Port Authority",
      expiry: "2024-11-15",
      encrypted: true,
    },
    {
      id: "LC-2024-003",
      type: "Standby Letter of Credit",
      amount: "$1,200,000",
      currency: "USD",
      status: "processing",
      issuer: "Deutsche Bank",
      beneficiary: "Ocean Freight Co",
      expiry: "2025-01-20",
      encrypted: true,
    },
    {
      id: "BOL-2024-087",
      type: "Bill of Lading",
      amount: "$650,000",
      currency: "USD",
      status: "validated",
      issuer: "Maersk Line",
      beneficiary: "Continental Trading",
      expiry: "2024-10-30",
      encrypted: true,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated":
        return <CheckCircle className="w-4 h-4 text-secure-green" />;
      case "pending":
        return <Clock className="w-4 h-4 text-alert-amber" />;
      case "processing":
        return <AlertTriangle className="w-4 h-4 text-tech-cyan" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-secure-green/20 text-secure-green border-secure-green/30">Validated</Badge>;
      case "pending":
        return <Badge className="bg-alert-amber/20 text-alert-amber border-alert-amber/30">Pending</Badge>;
      case "processing":
        return <Badge className="bg-tech-cyan/20 text-tech-cyan border-tech-cyan/30">Processing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleViewDetails = (doc: any) => {
    setSelectedDocument(doc);
    setDetailsOpen(true);
  };

  const handleValidate = (doc: any) => {
    toast({
      title: "Validation Started",
      description: `Document ${doc.id} is now being validated.`,
    });
    // Here you would typically call an API to start validation
  };

  const handleValidateFromDetails = () => {
    if (selectedDocument) {
      handleValidate(selectedDocument);
      setDetailsOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trade Document Board</h2>
          <p className="text-muted-foreground">Encrypted letters of credit and trade documents</p>
        </div>
        <Button className="bg-gradient-secure text-white shadow-secure">
          <Shield className="w-4 h-4 mr-2" />
          New Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-6 hover:shadow-ocean transition-smooth border-border/50 bg-card/80 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-maritime">
                  {getStatusIcon(doc.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{doc.id}</h3>
                  <p className="text-sm text-muted-foreground">{doc.type}</p>
                </div>
              </div>
              {getStatusBadge(doc.status)}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount:</span>
                <span className="font-semibold text-maritime-gold">{doc.amount} {doc.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Issuer:</span>
                <span className="text-sm text-foreground">{doc.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Beneficiary:</span>
                <span className="text-sm text-foreground">{doc.beneficiary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Expires:</span>
                <span className="text-sm text-foreground">{doc.expiry}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-2 text-tech-cyan">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium">Encrypted</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleViewDetails(doc)}
                >
                  View Details
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-gradient-secure text-white"
                  onClick={() => handleValidate(doc)}
                >
                  Validate
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <DocumentDetails
        document={selectedDocument}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onValidate={handleValidateFromDetails}
      />
    </div>
  );
};

export default TradingBoard;