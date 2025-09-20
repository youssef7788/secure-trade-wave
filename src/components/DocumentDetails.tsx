import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, AlertTriangle, Lock, FileText, Shield, Download } from "lucide-react";

interface DocumentDetailsProps {
  document: {
    id: string;
    type: string;
    amount: string;
    currency: string;
    status: string;
    issuer: string;
    beneficiary: string;
    expiry: string;
    encrypted: boolean;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onValidate?: () => void;
}

const DocumentDetails = ({ document, open, onOpenChange, onValidate }: DocumentDetailsProps) => {
  if (!document) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated":
        return <CheckCircle className="w-5 h-5 text-secure-green" />;
      case "pending":
        return <Clock className="w-5 h-5 text-alert-amber" />;
      case "processing":
        return <AlertTriangle className="w-5 h-5 text-tech-cyan" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
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

  const documentFields = [
    { label: "Document ID", value: document.id },
    { label: "Document Type", value: document.type },
    { label: "Amount", value: `${document.amount} ${document.currency}` },
    { label: "Issuer", value: document.issuer },
    { label: "Beneficiary", value: document.beneficiary },
    { label: "Expiry Date", value: document.expiry },
    { label: "Created", value: "2024-01-10 09:30:00" },
    { label: "Last Updated", value: "2024-01-15 14:25:00" },
    { label: "Validation Score", value: "94.7%" },
    { label: "Risk Level", value: "Low" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card/95 backdrop-blur-sm border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-maritime">
                {getStatusIcon(document.status)}
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Document Details
              </DialogTitle>
            </div>
            {getStatusBadge(document.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Security Status */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-maritime/10 border border-tech-cyan/20">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-tech-cyan" />
              <div>
                <p className="font-medium text-foreground">Security Status</p>
                <p className="text-sm text-muted-foreground">Document is encrypted and secure</p>
              </div>
            </div>
            <Shield className="w-6 h-6 text-secure-green" />
          </div>

          {/* Document Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Document Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentFields.map((field) => (
                <div key={field.label} className="space-y-1">
                  <p className="text-sm text-muted-foreground">{field.label}</p>
                  <p className="font-medium text-foreground">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Validation History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Validation History</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
                <CheckCircle className="w-4 h-4 text-secure-green" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Initial Validation</p>
                  <p className="text-xs text-muted-foreground">2024-01-10 09:45:00 - System Auto-Check</p>
                </div>
                <Badge className="bg-secure-green/20 text-secure-green border-secure-green/30">Passed</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
                <Clock className="w-4 h-4 text-alert-amber" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Manual Review</p>
                  <p className="text-xs text-muted-foreground">2024-01-15 14:20:00 - Pending Approval</p>
                </div>
                <Badge className="bg-alert-amber/20 text-alert-amber border-alert-amber/30">Pending</Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              {document.status !== "validated" && (
                <Button 
                  className="bg-gradient-secure text-white"
                  onClick={onValidate}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Validate Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetails;