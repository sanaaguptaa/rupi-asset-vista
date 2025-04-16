import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart, BarChart, PieChart } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import { formatRupees } from "@/lib/utils";

export function ReportsPage() {
  const [assetData, setAssetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const { data, error } = await supabase.from('assets').select('*');
      if (error) throw error;
      setAssetData(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast.error('Failed to fetch assets');
      setLoading(false);
    }
  };

  const exportReport = async () => {
    try {
      // Convert assets to CSV
      const csvContent = convertToCSV(assetData);
      
      // Create a Blob with the CSV data
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a link to download the file
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'asset_report.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Report exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export report');
    }
  };

  const convertToCSV = (data: any[]) => {
    // Define CSV headers
    const headers = [
      'Asset ID', 'Asset Name', 'Asset Class', 'Asset Type', 
      'Department', 'Location', 'Purchase Date', 
      'Purchase Value', 'Verified Amount', 'Out of Scope Amount', 
      'Asset Writeoff Amount', 'Sold Out Amount', 'Grand Total', 'Status'
    ];

    // Convert data to CSV rows
    const csvRows = data.map(asset => [
      asset.asset_id,
      asset.asset_name,
      asset.asset_class,
      asset.asset_type,
      asset.department,
      asset.location,
      asset.purchase_date,
      asset.purchase_value,
      asset.verified_amount,
      asset.out_of_scope_amount,
      asset.asset_writeoff_amount,
      asset.sold_out_amount,
      asset.grand_total,
      asset.status
    ].map(value => 
      `"${String(value).replace(/"/g, '""')}"` // Escape quotes
    ).join(','));

    // Combine headers and rows
    return [headers.map(h => `"${h}"`).join(','), ...csvRows].join('\n');
  };

  // Calculate summary data
  const totalAssets = assetData.length;
  const totalValue = assetData.reduce((acc, asset) => acc + asset.grand_total, 0);
  
  // Prepare data for charts
  const assetTypeData = assetData.reduce((acc: any[], asset) => {
    const typeIndex = acc.findIndex(item => item.name === asset.asset_type);
    if (typeIndex !== -1) {
      acc[typeIndex].value += 1;
    } else {
      acc.push({ name: asset.asset_type, value: 1 });
    }
    return acc;
  }, []);
  
  const statusData = assetData.reduce((acc: any[], asset) => {
    const statusIndex = acc.findIndex(item => item.name === asset.status);
    if (statusIndex !== -1) {
      acc[statusIndex].value += 1;
    } else {
      acc.push({ name: asset.status, value: 1 });
    }
    return acc;
  }, []);
  
  const departmentValueData = assetData.reduce((acc: any[], asset) => {
    const deptIndex = acc.findIndex(item => item.name === asset.department);
    if (deptIndex !== -1) {
      acc[deptIndex].value += asset.grand_total;
    } else {
      acc.push({ name: asset.department, value: asset.grand_total });
    }
    return acc;
  }, []);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  // Safe formatter function to handle different value types
  const safeValueFormatter = (value: any): string => {
    return typeof value === 'number' ? formatRupees(value) : String(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/30">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Reports</h1>
            <Button onClick={exportReport}>
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
                <div className="text-3xl font-bold">{safeValueFormatter(totalValue)}</div>
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
