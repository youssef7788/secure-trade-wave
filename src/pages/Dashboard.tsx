import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, FileText, Shield, DollarSign } from "lucide-react";
import EncryptedTradeForm from "@/components/EncryptedTradeForm";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Documents",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "text-tech-cyan"
    },
    {
      title: "Validated Amount",
      value: "$5.24M",
      change: "+8%",
      trend: "up", 
      icon: DollarSign,
      color: "text-maritime-gold"
    },
    {
      title: "Security Score",
      value: "98.5%",
      change: "+2%",
      trend: "up",
      icon: Shield,
      color: "text-secure-green"
    },
    {
      title: "Processing Time",
      value: "1.2hrs",
      change: "-15%",
      trend: "down",
      icon: TrendingUp,
      color: "text-alert-amber"
    }
  ];

  const recentActivity = [
    { id: "LC-2024-001", action: "Validated", time: "2 minutes ago", status: "success" },
    { id: "INV-2024-142", action: "Pending Review", time: "15 minutes ago", status: "warning" },
    { id: "LC-2024-003", action: "Processing", time: "1 hour ago", status: "info" },
    { id: "BOL-2024-087", action: "Validated", time: "2 hours ago", status: "success" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your trade finance operations</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`w-3 h-3 ${stat.trend === 'up' ? 'text-secure-green' : 'text-alert-red'}`} />
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-secure-green' : 'text-alert-red'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-maritime ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Encrypted Trade Form */}
      <EncryptedTradeForm 
        contractAddress="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6" 
        abi={[]} 
      />

      {/* Recent Activity */}
      <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse" />
                <div>
                  <p className="font-medium text-foreground">{activity.id}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <Badge className={
                activity.status === 'success' ? 'bg-secure-green/20 text-secure-green border-secure-green/30' :
                activity.status === 'warning' ? 'bg-alert-amber/20 text-alert-amber border-alert-amber/30' :
                'bg-tech-cyan/20 text-tech-cyan border-tech-cyan/30'
              }>
                {activity.action}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;