
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Sample audit log data
const auditLogs = [
  { id: 1, action: "Asset Created", asset: "Office Laptop #122", user: "John Doe", timestamp: "2025-04-14T14:23:01", details: "Added new IT asset with value ₹85,000" },
  { id: 2, action: "Asset Updated", asset: "Office Building #3", user: "Jane Smith", timestamp: "2025-04-13T10:15:32", details: "Updated depreciation values and maintenance schedule" },
  { id: 3, action: "Asset Transferred", asset: "Company Car #08", user: "Mike Johnson", timestamp: "2025-04-12T16:45:11", details: "Transferred from Sales to Marketing department" },
  { id: 4, action: "Asset Disposed", asset: "Old Server #15", user: "Sarah Williams", timestamp: "2025-04-10T11:30:22", details: "Marked as disposed with salvage value ₹12,500" },
  { id: 5, action: "Asset Maintenance", asset: "Elevator System", user: "Robert Brown", timestamp: "2025-04-09T09:20:41", details: "Scheduled maintenance performed, cost ₹35,000" },
  { id: 6, action: "Asset Created", asset: "Conference Room Furniture", user: "John Doe", timestamp: "2025-04-08T15:12:33", details: "Added new asset set with value ₹1,25,000" },
  { id: 7, action: "User Login", asset: "System", user: "Admin", timestamp: "2025-04-08T08:00:12", details: "Administrator login from 192.168.1.105" },
  { id: 8, action: "Settings Changed", asset: "System", user: "Admin", timestamp: "2025-04-07T17:45:09", details: "Modified depreciation calculation settings" },
];

export function AuditLogsPage() {
  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gradient-to-br from-background to-muted/30">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold">Audit Logs</h1>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-8" placeholder="Search logs..." />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                System Activity Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Asset</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Timestamp</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            log.action.includes('Created') ? 'bg-green-100 text-green-800' : 
                            log.action.includes('Updated') ? 'bg-blue-100 text-blue-800' : 
                            log.action.includes('Transferred') ? 'bg-purple-100 text-purple-800' :
                            log.action.includes('Disposed') ? 'bg-red-100 text-red-800' :
                            log.action.includes('Maintenance') ? 'bg-amber-100 text-amber-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4">{log.asset}</td>
                        <td className="py-3 px-4">{log.user}</td>
                        <td className="py-3 px-4 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                        <td className="py-3 px-4">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing {auditLogs.length} of {auditLogs.length} entries
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
