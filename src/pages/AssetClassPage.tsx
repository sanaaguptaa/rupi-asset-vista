
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";
import { Building2 } from "lucide-react";

interface AssetClassPageProps {
  assetType: string;
}

export function AssetClassPage({ assetType }: AssetClassPageProps) {
  // Filter assets by type
  const filteredAssets = assetData.filter(asset => asset.assetType === assetType);
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/30">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{assetType}</h1>
            <div className="text-sm text-muted-foreground">
              {filteredAssets.length} assets found
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-primary" />
                {assetType} Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Assets</h3>
                  <p className="text-2xl font-bold">{filteredAssets.length}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                  <p className="text-2xl font-bold">
                    {formatRupees(filteredAssets.reduce((acc, asset) => acc + asset.grandTotal, 0))}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Verified Value</h3>
                  <p className="text-2xl font-bold">
                    {formatRupees(filteredAssets.reduce((acc, asset) => acc + asset.verifiedAmount, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredAssets.length === 0 ? (
              <Card>
                <CardContent className="py-8 flex flex-col items-center justify-center">
                  <p className="text-xl font-medium text-muted-foreground mb-2">No {assetType} Found</p>
                  <p className="text-sm text-muted-foreground">Add new assets to get started.</p>
                </CardContent>
              </Card>
            ) : (
              filteredAssets.map((asset, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row items-start">
                      <div className="p-4 flex-1">
                        <h3 className="font-medium">{asset.assetName}</h3>
                        <p className="text-sm text-muted-foreground">ID: {asset.assetId}</p>
                        <div className="grid grid-cols-2 gap-4 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Purchase Date</p>
                            <p className="text-sm">{asset.purchaseDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Department</p>
                            <p className="text-sm">{asset.department}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-muted/20 p-4 w-full sm:w-auto sm:min-w-[200px]">
                        <div className="text-xs text-muted-foreground mb-1">Value</div>
                        <div className="text-xl font-bold">{formatRupees(asset.grandTotal)}</div>
                        <div className="text-xs text-muted-foreground mt-3 mb-1">Status</div>
                        <div className={`text-sm font-medium inline-block px-2 py-1 rounded-full ${
                          asset.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          asset.status === 'Under Maintenance' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {asset.status}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
