import TradingBoard from "@/components/TradingBoard";

const Documents = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Documents</h1>
        <p className="text-muted-foreground">Manage your encrypted trade documents</p>
      </div>
      <TradingBoard />
    </div>
  );
};

export default Documents;