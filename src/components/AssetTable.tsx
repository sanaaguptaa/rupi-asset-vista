
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, FileText, Search, ArrowUpDown } from "lucide-react";
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AssetTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("assetClass");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter assets based on search term
  const filteredAssets = assetData.filter(asset => 
    asset.assetClass.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Toggle sort direction
  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };
  
  // Sort assets based on the selected column
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const factor = sortDirection === "asc" ? 1 : -1;
    
    switch (sortBy) {
      case "assetClass":
        return factor * a.assetClass.localeCompare(b.assetClass);
      case "verifiedAmount":
        return factor * (a.verifiedAmount - b.verifiedAmount);
      case "outOfScopeAmount":
        return factor * (a.outOfScopeAmount - b.outOfScopeAmount);
      case "assetWriteoffAmount":
        return factor * (a.assetWriteoffAmount - b.assetWriteoffAmount);
      case "soldOutAmount":
        return factor * (a.soldOutAmount - b.soldOutAmount);
      case "grandTotal":
        return factor * (a.grandTotal - b.grandTotal);
      default:
        return 0;
    }
  });

  // Calculate total values for the summary row
  const totals = {
    verifiedAmount: assetData.reduce((acc, asset) => acc + asset.verifiedAmount, 0),
    outOfScopeAmount: assetData.reduce((acc, asset) => acc + asset.outOfScopeAmount, 0),
    assetWriteoffAmount: assetData.reduce((acc, asset) => acc + asset.assetWriteoffAmount, 0),
    soldOutAmount: assetData.reduce((acc, asset) => acc + asset.soldOutAmount, 0),
    grandTotal: assetData.reduce((acc, asset) => acc + asset.grandTotal, 0)
  };

  // Get cell background color based on asset class
  const getAssetClassColor = (assetClass: string) => {
    const colorMap: Record<string, string> = {
      "Building": "bg-blue-50 dark:bg-blue-900/20",
      "Computer": "bg-indigo-50 dark:bg-indigo-900/20",
      "IT & EF": "bg-cyan-50 dark:bg-cyan-900/20",
      "Intangible": "bg-purple-50 dark:bg-purple-900/20",
      "Land": "bg-green-50 dark:bg-green-900/20",
      "Moulds": "bg-amber-50 dark:bg-amber-900/20",
      "OE": "bg-orange-50 dark:bg-orange-900/20",
      "Others": "bg-gray-50 dark:bg-gray-900/20",
      "P&M": "bg-red-50 dark:bg-red-900/20",
      "Vehicles": "bg-emerald-50 dark:bg-emerald-900/20"
    };

    return colorMap[assetClass] || "";
  };

  return (
    <Card className="shadow-md border">
      <CardHeader className="pb-0">
        <CardTitle>Fixed Assets Inventory</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 mt-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assetClass">Asset Class</SelectItem>
                <SelectItem value="verifiedAmount">Verified Amount</SelectItem>
                <SelectItem value="outOfScopeAmount">Out of Scope</SelectItem>
                <SelectItem value="assetWriteoffAmount">Asset Writeoff</SelectItem>
                <SelectItem value="soldOutAmount">Sold Out</SelectItem>
                <SelectItem value="grandTotal">Grand Total</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="font-medium cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSort("assetClass")}
                  >
                    <div className="flex items-center">
                      Asset Class
                      {sortBy === "assetClass" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSort("verifiedAmount")}
                  >
                    <div className="flex items-center justify-end">
                      Verified & Matched
                      {sortBy === "verifiedAmount" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSort("outOfScopeAmount")}
                  >
                    <div className="flex items-center justify-end">
                      Out Of Scope
                      {sortBy === "outOfScopeAmount" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSort("assetWriteoffAmount")}
                  >
                    <div className="flex items-center justify-end">
                      Asset Writeoff
                      {sortBy === "assetWriteoffAmount" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSort("soldOutAmount")}
                  >
                    <div className="flex items-center justify-end">
                      Sold Out
                      {sortBy === "soldOutAmount" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="font-medium text-right cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleSort("grandTotal")}
                  >
                    <div className="flex items-center justify-end">
                      Grand Total
                      {sortBy === "grandTotal" && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAssets.map((asset) => (
                  <TableRow key={asset.assetClass} className="hover:bg-muted/30">
                    <TableCell className={`font-medium ${getAssetClassColor(asset.assetClass)}`}>
                      {asset.assetClass}
                    </TableCell>
                    <TableCell className="text-right">{formatRupees(asset.verifiedAmount)}</TableCell>
                    <TableCell className="text-right">{formatRupees(asset.outOfScopeAmount)}</TableCell>
                    <TableCell className="text-right">{formatRupees(asset.assetWriteoffAmount)}</TableCell>
                    <TableCell className="text-right">{formatRupees(asset.soldOutAmount)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatRupees(asset.grandTotal)}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/70 font-semibold">
                  <TableCell>Grand Total</TableCell>
                  <TableCell className="text-right">{formatRupees(totals.verifiedAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(totals.outOfScopeAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(totals.assetWriteoffAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(totals.soldOutAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(totals.grandTotal)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" />
          <span>Showing {sortedAssets.length} of {assetData.length} assets</span>
        </div>
      </CardContent>
    </Card>
  );
}
