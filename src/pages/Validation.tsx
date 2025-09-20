import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle, Shield, FileCheck } from "lucide-react";

const Validation = () => {
  const validationQueue = [
    {
      id: "INV-2024-142",
      type: "Commercial Invoice",
      amount: "$890,000",
      status: "pending",
      priority: "high",
      submittedBy: "Shipping Solutions Ltd",
      timeInQueue: "2 hours"
    },
    {
      id: "LC-2024-003", 
      type: "Standby Letter of Credit",
      amount: "$1,200,000",
      status: "processing",
      priority: "medium",
      submittedBy: "Deutsche Bank",
      timeInQueue: "4 hours"
    },
    {
      id: "DOC-2024-089",
      type: "Bill of Exchange",
      amount: "$450,000", 
      status: "pending",
      priority: "low",
      submittedBy: "Maritime Trade Co",
      timeInQueue: "1 hour"
    }
  ];

  const validationHistory = [
    {
      id: "LC-2024-001",
      type: "Letter of Credit", 
      amount: "$2,500,000",
      status: "validated",
      validatedAt: "2024-01-15 14:30",
      validator: "System Auto-Validation"
    },
    {
      id: "BOL-2024-087",
      type: "Bill of Lading",
      amount: "$650,000",
      status: "validated", 
      validatedAt: "2024-01-15 12:15",
      validator: "Manual Review"
    }
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
        return <FileCheck className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-alert-red/20 text-alert-red border-alert-red/30">High Priority</Badge>;
      case "medium":
        return <Badge className="bg-alert-amber/20 text-alert-amber border-alert-amber/30">Medium Priority</Badge>;
      case "low":
        return <Badge className="bg-tech-cyan/20 text-tech-cyan border-tech-cyan/30">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Validation Center</h1>
          <p className="text-muted-foreground">Review and validate trade documents</p>
        </div>
        <Button className="bg-gradient-secure text-white shadow-secure">
          <Shield className="w-4 h-4 mr-2" />
          Bulk Validate
        </Button>
      </div>

      {/* Validation Queue */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">Validation Queue</h2>
        <div className="space-y-4">
          {validationQueue.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:shadow-ocean transition-smooth">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-gradient-maritime">
                  {getStatusIcon(doc.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{doc.id}</h3>
                    {getPriorityBadge(doc.priority)}
                  </div>
                  <p className="text-sm text-muted-foreground">{doc.type}</p>
                  <p className="text-xs text-muted-foreground">Submitted by {doc.submittedBy} • In queue for {doc.timeInQueue}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-maritime-gold">{doc.amount}</p>
                  <p className="text-xs text-muted-foreground capitalize">{doc.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Review
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="bg-gradient-secure text-white"
                  >
                    Validate Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Validation History */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Validations</h2>
        <div className="space-y-3">
          {validationHistory.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-secure-green" />
                <div>
                  <p className="font-medium text-foreground">{doc.id} - {doc.type}</p>
                  <p className="text-sm text-muted-foreground">Validated on {doc.validatedAt} by {doc.validator}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-maritime-gold">{doc.amount}</p>
                <Badge className="bg-secure-green/20 text-secure-green border-secure-green/30">
                  Validated
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Validation;