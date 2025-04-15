
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, PieChart, Pie, Sector
} from 'recharts';
import { assetData } from "@/data/assetData";
import { formatRupees } from "@/lib/utils";
import { useState } from "react";

// Custom active shape for PieChart
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.8}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={12}>
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={11}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill="#999" fontSize={11}>
        {formatRupees(value)}
      </text>
    </g>
  );
};

export function AssetOverview() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate total values
  const verifiedTotal = assetData.reduce((acc, item) => acc + item.verifiedAmount, 0);
  const outOfScopeTotal = assetData.reduce((acc, item) => acc + item.outOfScopeAmount, 0);
  const assetWriteoffTotal = assetData.reduce((acc, item) => acc + item.assetWriteoffAmount, 0);
  const soldOutTotal = assetData.reduce((acc, item) => acc + item.soldOutAmount, 0);
  const grandTotal = assetData.reduce((acc, item) => acc + item.grandTotal, 0);

  // Prepare data for pie chart
  const pieData = [
    { name: 'Verified', value: verifiedTotal, fill: '#6366F1' },
    { name: 'Out of Scope', value: outOfScopeTotal, fill: '#F59E0B' },
    { name: 'Asset Writeoff', value: assetWriteoffTotal, fill: '#EF4444' },
    { name: 'Sold Out', value: soldOutTotal, fill: '#10B981' },
  ];

  // Filter out zero values
  const filteredPieData = pieData.filter(item => item.value > 0);

  // Custom colors for bar chart
  const COLORS = ['#6366F1', '#F59E0B', '#EF4444', '#10B981'];

  // Sorted bar chart data to show highest values first
  const sortedAssetData = [...assetData]
    .sort((a, b) => b.grandTotal - a.grandTotal)
    .slice(0, 6); // Show only top 6 for better visibility

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle>Asset Distribution</CardTitle>
          <CardDescription>Value distribution across top asset classes</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedAssetData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barSize={25}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <YAxis dataKey="assetClass" type="category" width={80} />
              <XAxis type="number" tickFormatter={(value) => `₹${(value / 10000000).toFixed(1)}Cr`} />
              <Tooltip formatter={(value) => formatRupees(value as number)} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="verifiedAmount" name="Verified & Matched" stackId="a" fill="#6366F1" radius={[0, 4, 4, 0]} />
              <Bar dataKey="outOfScopeAmount" name="Out Of Scope" stackId="a" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              <Bar dataKey="assetWriteoffAmount" name="Asset Writeoff" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} />
              <Bar dataKey="soldOutAmount" name="Sold Out" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle>Asset Value Distribution</CardTitle>
          <CardDescription>Total value by asset status</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={filteredPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {filteredPieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatRupees(value as number)} />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{ paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
