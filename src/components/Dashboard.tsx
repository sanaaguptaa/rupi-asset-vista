
import { useState } from "react";
import { AssetOverview } from "./AssetOverview";
import { AssetTable } from "./AssetTable";
import { Sidebar } from "./Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assetData as initialAssetData } from "@/data/assetData";
import { formatRupees, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown, Building2, BriefcaseBusiness, Building, Car, PlusCircle, Edit3, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export function Dashboard() {
  const [assetData, setAssetData] = useState(initialAssetData);
  const [searchQuery, setSearchQuery] = useState("");
  const [addAssetOpen, setAddAssetOpen] = useState(false);
  const [editAssetOpen, setEditAssetOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const { toast } = useToast();
  
  // Form state for new asset
  const [newAsset, setNewAsset] = useState({
    assetName: "",
    assetType: "Buildings",
    department: "Finance",
    location: "Headquarters",
    purchaseDate: "",
    purchaseValue: 0,
    grandTotal: 0,
    verifiedAmount: 0,
    status: "Active"
  });
  
  // Calculate summary values
  const totalAssets = assetData.length;
  const totalValue = assetData.reduce((acc, item) => acc + item.grandTotal, 0);
  const verifiedValue = assetData.reduce((acc, item) => acc + item.verifiedAmount, 0);
  const mappingPercentage = (verifiedValue / totalValue) * 100;
  
  // Calculate month-over-month change (sample data)
  const isIncreasing = true;
  const changePercentage = 4.25;
  
  // Handle input change for new asset
  const handleNewAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAsset({
      ...newAsset,
      [name]: name === 'purchaseValue' || name === 'grandTotal' || name === 'verifiedAmount' 
        ? parseFloat(value) || 0 
        : value
    });
  };
  
  // Handle select change for new asset
  const handleSelectChange = (name: string, value: string) => {
    setNewAsset({
      ...newAsset,
      [name]: value
    });
  };
  
  // Handle add asset form submission
  const handleAddAsset = () => {
    // Generate a unique asset ID
    const assetId = `AST${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Create new asset with auto-filled fields
    const asset = {
      ...newAsset,
      assetId,
      verifiedAmount: newAsset.verifiedAmount || newAsset.grandTotal * 0.9, // Default to 90% of grand total if not specified
      grandTotal: newAsset.grandTotal || newAsset.purchaseValue, // Default to purchase value if not specified
    };
    
    // Add new asset to the list
    setAssetData([asset, ...assetData]);
    
    // Reset form and close dialog
    setNewAsset({
      assetName: "",
      assetType: "Buildings",
      department: "Finance",
      location: "Headquarters",
      purchaseDate: "",
      purchaseValue: 0,
      grandTotal: 0,
      verifiedAmount: 0,
      status: "Active"
    });
    setAddAssetOpen(false);
    
    // Show success toast
    toast({
      title: "Asset Added",
      description: `${asset.assetName} has been added successfully.`,
    });
  };
  
  // Handle edit asset
  const handleEditAsset = (asset: any) => {
    setSelectedAsset(asset);
    setEditAssetOpen(true);
  };
  
  // Handle update asset
  const handleUpdateAsset = () => {
    // Update asset in the list
    const updatedAssets = assetData.map(asset => 
      asset.assetId === selectedAsset.assetId ? selectedAsset : asset
    );
    
    setAssetData(updatedAssets);
    setEditAssetOpen(false);
    
    // Show success toast
    toast({
      title: "Asset Updated",
      description: `${selectedAsset.assetName} has been updated successfully.`,
    });
  };
  
  // Handle input change for editing asset
  const handleEditAssetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedAsset({
      ...selectedAsset,
      [name]: name === 'purchaseValue' || name === 'grandTotal' || name === 'verifiedAmount' 
        ? parseFloat(value) || 0 
        : value
    });
  };
  
  // Handle select change for editing asset
  const handleEditSelectChange = (name: string, value: string) => {
    setSelectedAsset({
      ...selectedAsset,
      [name]: value
    });
  };
  
  // Filter assets based on search query
  const filteredAssets = assetData.filter(asset => 
    asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.assetType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-8" 
                placeholder="Search assets..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Dialog open={addAssetOpen} onOpenChange={setAddAssetOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Asset
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Add New Asset</DialogTitle>
                    <DialogDescription>Enter the details of the new asset below.</DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assetName">Asset Name</Label>
                        <Input 
                          id="assetName" 
                          name="assetName" 
                          value={newAsset.assetName} 
                          onChange={handleNewAssetChange} 
                          placeholder="Enter asset name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="assetType">Asset Type</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("assetType", value)}
                          defaultValue={newAsset.assetType}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select asset type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Buildings">Buildings</SelectItem>
                            <SelectItem value="IT Assets">IT Assets</SelectItem>
                            <SelectItem value="Vehicles">Vehicles</SelectItem>
                            <SelectItem value="Machinery">Machinery</SelectItem>
                            <SelectItem value="Furniture">Furniture</SelectItem>
                            <SelectItem value="Intangibles">Intangibles</SelectItem>
                            <SelectItem value="Land">Land</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("department", value)}
                          defaultValue={newAsset.department}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="IT">IT</SelectItem>
                            <SelectItem value="HR">HR</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="Sales">Sales</SelectItem>
                            <SelectItem value="Executive">Executive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={newAsset.location} 
                          onChange={handleNewAssetChange} 
                          placeholder="Enter location"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="purchaseDate">Purchase Date</Label>
                        <Input 
                          id="purchaseDate" 
                          name="purchaseDate" 
                          type="date" 
                          value={newAsset.purchaseDate}
                          onChange={handleNewAssetChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="purchaseValue">Purchase Value (₹)</Label>
                        <Input 
                          id="purchaseValue" 
                          name="purchaseValue" 
                          type="number" 
                          value={newAsset.purchaseValue.toString()} 
                          onChange={handleNewAssetChange} 
                          placeholder="Enter purchase value"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("status", value)}
                          defaultValue={newAsset.status}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                            <SelectItem value="Disposed">Disposed</SelectItem>
                            <SelectItem value="On Loan">On Loan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddAssetOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddAsset}>Save Asset</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={editAssetOpen} onOpenChange={setEditAssetOpen}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Asset</DialogTitle>
                    <DialogDescription>Update the details of the asset below.</DialogDescription>
                  </DialogHeader>
                  
                  {selectedAsset && (
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="assetName">Asset Name</Label>
                          <Input 
                            id="assetName" 
                            name="assetName" 
                            value={selectedAsset.assetName} 
                            onChange={handleEditAssetChange} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="assetType">Asset Type</Label>
                          <Select 
                            onValueChange={(value) => handleEditSelectChange("assetType", value)}
                            defaultValue={selectedAsset.assetType}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select asset type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Buildings">Buildings</SelectItem>
                              <SelectItem value="IT Assets">IT Assets</SelectItem>
                              <SelectItem value="Vehicles">Vehicles</SelectItem>
                              <SelectItem value="Machinery">Machinery</SelectItem>
                              <SelectItem value="Furniture">Furniture</SelectItem>
                              <SelectItem value="Intangibles">Intangibles</SelectItem>
                              <SelectItem value="Land">Land</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Select 
                            onValueChange={(value) => handleEditSelectChange("department", value)}
                            defaultValue={selectedAsset.department}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                              <SelectItem value="Marketing">Marketing</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                              <SelectItem value="Executive">Executive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input 
                            id="location" 
                            name="location" 
                            value={selectedAsset.location || ''} 
                            onChange={handleEditAssetChange} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="purchaseDate">Purchase Date</Label>
                          <Input 
                            id="purchaseDate" 
                            name="purchaseDate" 
                            type="date" 
                            value={selectedAsset.purchaseDate}
                            onChange={handleEditAssetChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="purchaseValue">Purchase Value (₹)</Label>
                          <Input 
                            id="purchaseValue" 
                            name="purchaseValue" 
                            type="number" 
                            value={selectedAsset.purchaseValue?.toString() || '0'} 
                            onChange={handleEditAssetChange} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="grandTotal">Current Value (₹)</Label>
                          <Input 
                            id="grandTotal" 
                            name="grandTotal" 
                            type="number" 
                            value={selectedAsset.grandTotal.toString()} 
                            onChange={handleEditAssetChange} 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <Select 
                            onValueChange={(value) => handleEditSelectChange("status", value)}
                            defaultValue={selectedAsset.status}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                              <SelectItem value="Disposed">Disposed</SelectItem>
                              <SelectItem value="On Loan">On Loan</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditAssetOpen(false)}>Cancel</Button>
                    <Button onClick={handleUpdateAsset}>Update Asset</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                <Edit3 className="h-4 w-4 mr-2" />
                Bulk Edit
              </Button>
            </div>
          </div>
          
          <AssetOverview assetData={assetData} />
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Inventory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Asset Name</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Department</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Value</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAssets.map((asset, index) => (
                        <tr key={index} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{asset.assetName}</td>
                          <td className="py-3 px-4">{asset.assetId}</td>
                          <td className="py-3 px-4">{asset.assetType}</td>
                          <td className="py-3 px-4">{asset.department}</td>
                          <td className="py-3 px-4">{formatRupees(asset.grandTotal)}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              asset.status === 'Active' ? 'bg-green-100 text-green-800' : 
                              asset.status === 'Under Maintenance' ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {asset.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm" onClick={() => handleEditAsset(asset)}>
                              <Edit3 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredAssets.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No assets found matching your search criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
