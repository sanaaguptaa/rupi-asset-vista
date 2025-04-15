
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, PieChart, Pie
} from 'recharts';
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";

export function AssetOverview() {
  // Calculate total values
  const verifiedTotal = assetData.reduce((acc, item) => acc + item.verifiedAmount, 0);
  const outOfScopeTotal = assetData.reduce((acc, item) => acc + item.outOfScopeAmount, 0);
  const assetWriteoffTotal = assetData.reduce((acc, item) => acc + item.assetWriteoffAmount, 0);
  const soldOutTotal = assetData.reduce((acc, item) => acc + item.soldOutAmount, 0);
  const grandTotal = assetData.reduce((acc, item) => acc + item.grandTotal, 0);

  // Prepare data for pie chart
  const pieData = [
    { name: 'Verified', value: verifiedTotal, fill: '#4C51BF' },
    { name: 'Out of Scope', value: outOfScopeTotal, fill: '#ED8936' },
    { name: 'Asset Writeoff', value: assetWriteoffTotal, fill: '#D69E2E' },
    { name: 'Sold Out', value: soldOutTotal, fill: '#38B2AC' },
  ];

  const COLORS = ['#4C51BF', '#ED8936', '#D69E2E', '#38B2AC'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card>
        <CardHeader>
          <CardTitle>Asset Distribution</CardTitle>
          <CardDescription>Value distribution across asset classes</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={assetData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="assetClass" angle={-45} textAnchor="end" height={80} />
              <YAxis tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
              <Tooltip formatter={(value) => formatRupees(value as number)} />
              <Legend />
              <Bar dataKey="verifiedAmount" name="Verified & Matched" stackId="a" fill="#4C51BF" />
              <Bar dataKey="outOfScopeAmount" name="Out Of Scope" stackId="a" fill="#ED8936" />
              <Bar dataKey="assetWriteoffAmount" name="Asset Writeoff" stackId="a" fill="#D69E2E" />
              <Bar dataKey="soldOutAmount" name="Sold Out" stackId="a" fill="#38B2AC" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Asset Value Distribution</CardTitle>
          <CardDescription>Total value by asset status</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatRupees(value as number)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
