
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
import { Download, FileText, Search } from "lucide-react";
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";

export function AssetTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("assetClass");

  // Filter assets based on search term
  const filteredAssets = assetData.filter(asset => 
    asset.assetClass.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort assets based on the selected column
  const sortedAssets = [...filteredAssets].sort((a, b) => {
    switch (sortBy) {
      case "assetClass":
        return a.assetClass.localeCompare(b.assetClass);
      case "verifiedAmount":
        return b.verifiedAmount - a.verifiedAmount;
      case "outOfScopeAmount":
        return b.outOfScopeAmount - a.outOfScopeAmount;
      case "grandTotal":
        return b.grandTotal - a.grandTotal;
      default:
        return 0;
    }
  });

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Fixed Assets</h2>
          <div className="flex w-full md:w-auto space-x-2 items-center">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                className="pl-8 w-full md:w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assetClass">Asset Class</SelectItem>
                <SelectItem value="verifiedAmount">Verified Amount</SelectItem>
                <SelectItem value="outOfScopeAmount">Out of Scope</SelectItem>
                <SelectItem value="grandTotal">Grand Total</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Asset Class</TableHead>
                <TableHead className="font-medium text-right">Verified & Matched</TableHead>
                <TableHead className="font-medium text-right">Out Of Scope</TableHead>
                <TableHead className="font-medium text-right">Asset Writeoff</TableHead>
                <TableHead className="font-medium text-right">Sold Out</TableHead>
                <TableHead className="font-medium text-right">Grand Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedAssets.map((asset) => (
                <TableRow key={asset.assetClass}>
                  <TableCell className="font-medium">{asset.assetClass}</TableCell>
                  <TableCell className="text-right">{formatRupees(asset.verifiedAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(asset.outOfScopeAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(asset.assetWriteoffAmount)}</TableCell>
                  <TableCell className="text-right">{formatRupees(asset.soldOutAmount)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatRupees(asset.grandTotal)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/50">
                <TableCell className="font-semibold">Grand Total</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatRupees(assetData.reduce((acc, asset) => acc + asset.verifiedAmount, 0))}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatRupees(assetData.reduce((acc, asset) => acc + asset.outOfScopeAmount, 0))}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatRupees(assetData.reduce((acc, asset) => acc + asset.assetWriteoffAmount, 0))}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatRupees(assetData.reduce((acc, asset) => acc + asset.soldOutAmount, 0))}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatRupees(assetData.reduce((acc, asset) => acc + asset.grandTotal, 0))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 flex items-center justify-center text-sm text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" />
          <span>Showing {sortedAssets.length} of {assetData.length} assets</span>
        </div>
      </div>
    </div>
  );
}
