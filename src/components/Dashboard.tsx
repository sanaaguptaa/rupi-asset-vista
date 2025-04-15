
import { AssetOverview } from "./AssetOverview";
import { AssetTable } from "./AssetTable";
import { Sidebar } from "./Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";

export function Dashboard() {
  // Calculate summary values
  const totalAssets = assetData.length;
  const totalValue = assetData.reduce((acc, item) => acc + item.grandTotal, 0);
  const verifiedValue = assetData.reduce((acc, item) => acc + item.verifiedAmount, 0);
  const mappingPercentage = (verifiedValue / totalValue) * 100;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAssets}</div>
                <p className="text-xs text-muted-foreground mt-1">Asset classes tracked</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatRupees(totalValue)}</div>
                <p className="text-xs text-muted-foreground mt-1">Combined asset value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Verified Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatRupees(verifiedValue)}</div>
                <p className="text-xs text-muted-foreground mt-1">Verified & matched assets</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Mapping %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mappingPercentage.toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground mt-1">Percentage of verified assets</p>
              </CardContent>
            </Card>
          </div>
          
          <AssetOverview />
          <AssetTable />
        </div>
      </div>
    </div>
  );
}
