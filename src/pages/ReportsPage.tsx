import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";
import { FileBarChart, BarChart, PieChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PieChart as RechartsChart,
  Pie,
  BarChart as Rechart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export function ReportsPage() {
  // Calculate summary data
  const totalAssets = assetData.length;
  const totalValue = assetData.reduce((acc, asset) => acc + asset.grandTotal, 0);
  
  // Prepare data for charts - Add null checks
  const assetTypeData = assetData.reduce((acc, asset) => {
    if (!asset.assetType) return acc;
    
    const typeIndex = acc.findIndex(item => item.name === asset.assetType);
    if (typeIndex !== -1) {
      acc[typeIndex].value += 1;
    } else {
      acc.push({ name: asset.assetType, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  
  const statusData = assetData.reduce((acc, asset) => {
    if (!asset.status) return acc;
    
    const statusIndex = acc.findIndex(item => item.name === asset.status);
    if (statusIndex !== -1) {
      acc[statusIndex].value += 1;
    } else {
      acc.push({ name: asset.status, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  
  const departmentValueData = assetData.reduce((acc, asset) => {
    if (!asset.department) return acc;
    
    const deptIndex = acc.findIndex(item => item.name === asset.department);
    if (deptIndex !== -1) {
      acc[deptIndex].value += asset.grandTotal;
    } else {
      acc.push({ name: asset.department, value: asset.grandTotal });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  // Safe formatter function to handle different value types
  const safeValueFormatter = (value: any): string => {
    if (typeof value === 'number') {
      return formatRupees(value);
    }
    return String(value);
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/30">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reports</h1>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalAssets}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{formatRupees(totalValue)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Asset Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{assetTypeData.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Assets by Type
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={assetTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {assetTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value} assets`, 'Count']} />
                    <Legend />
                  </RechartsChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-primary" />
                  Assets by Status
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any) => [`${value} assets`, 'Count']} />
                    <Legend />
                  </RechartsChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-primary" />
                Department Asset Value
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <Rechart
                  data={departmentValueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(value: any) => [safeValueFormatter(value), 'Value']} />
                  <Legend />
                  <Bar dataKey="value" name="Value" fill="#8884d8" />
                </Rechart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
