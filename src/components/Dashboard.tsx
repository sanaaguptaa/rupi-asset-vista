
import { AssetOverview } from "./AssetOverview";
import { AssetTable } from "./AssetTable";
import { Sidebar } from "./Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assetData } from "@/data/assetData";
import { formatRupees, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown, Building2, BriefcaseBusiness, Building, Car } from "lucide-react";

export function Dashboard() {
  // Calculate summary values
  const totalAssets = assetData.length;
  const totalValue = assetData.reduce((acc, item) => acc + item.grandTotal, 0);
  const verifiedValue = assetData.reduce((acc, item) => acc + item.verifiedAmount, 0);
  const mappingPercentage = (verifiedValue / totalValue) * 100;
  
  // Calculate month-over-month change (sample data)
  const isIncreasing = true;
  const changePercentage = 4.25;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/30">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold">Asset Dashboard</h1>
            <div className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow">
              <span className="text-muted-foreground">Fixed Asset Management</span>
              {isIncreasing ? (
                <div className="flex items-center text-emerald-500 font-medium text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {formatPercentage(changePercentage)}
                </div>
              ) : (
                <div className="flex items-center text-red-500 font-medium text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  {formatPercentage(changePercentage)}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-blue-500/10 to-blue-600/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
                    <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </span>
                  Total Assets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalAssets}</div>
                <p className="text-xs text-muted-foreground mt-1">Asset classes tracked</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-indigo-500/10 to-indigo-600/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <span className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full mr-3">
                    <BriefcaseBusiness className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </span>
                  Total Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatRupees(totalValue)}</div>
                <p className="text-xs text-muted-foreground mt-1">Combined asset value</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-purple-500/10 to-purple-600/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <span className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full mr-3">
                    <Building className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </span>
                  Verified Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatRupees(verifiedValue)}</div>
                <p className="text-xs text-muted-foreground mt-1">Verified & matched assets</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-0 shadow-md bg-gradient-to-br from-green-500/10 to-green-600/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <span className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-3">
                    <Car className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </span>
                  Mapping %
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatPercentage(mappingPercentage)}</div>
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
