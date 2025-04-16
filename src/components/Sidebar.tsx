import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileBarChart,
  Building2,
  Building, 
  Computer, 
  BookOpen, 
  Map, 
  Package, 
  Settings, 
  Menu, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BadgeIndianRupee,
  Users,
  FileText,
  PlusCircle,
  Edit3,
  PlusSquare  // New icon for adding assets
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export function Sidebar() {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [addAssetDialogOpen, setAddAssetDialogOpen] = useState(false);
  const [newAsset, setNewAsset] = useState({
    asset_name: '',
    asset_type: 'Buildings',
    department: 'Finance',
    location: 'Headquarters',
    purchase_date: '',
    purchase_value: 0,
    verified_amount: 0,
    status: 'Active'
  });

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAsset(prev => ({
      ...prev,
      [name]: name.includes('value') ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewAsset(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAsset = async () => {
    try {
      const { data, error } = await supabase
        .from('assets')
        .insert({
          ...newAsset,
          out_of_scope_amount: 0,
          asset_writeoff_amount: 0,
          sold_out_amount: 0,
          grand_total: newAsset.purchase_value,
          asset_class: newAsset.asset_type
        })
        .select();

      if (error) throw error;

      toast.success('Asset added successfully');
      setAddAssetDialogOpen(false);
      
      // Reset form
      setNewAsset({
        asset_name: '',
        asset_type: 'Buildings',
        department: 'Finance',
        location: 'Headquarters',
        purchase_date: '',
        purchase_value: 0,
        verified_amount: 0,
        status: 'Active'
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      toast.error('Failed to add asset');
    }
  };

  const NavItem = ({ 
    icon: Icon, 
    label, 
    path,
    badge,
    onClick
  }: { 
    icon: React.ElementType; 
    label: string; 
    path?: string;
    badge?: string;
    onClick?: () => void;
  }) => {
    const isActive = path ? location.pathname === path : false;
    
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start mb-1 relative group",
          isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "",
          collapsed ? "px-2" : ""
        )}
        onClick={onClick || (() => path && handleNavigation(path))}
      >
        <Icon className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
        {!collapsed && <span>{label}</span>}
        {badge && !collapsed && (
          <span className="ml-auto bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        {collapsed && badge && (
          <span className="absolute -right-1 -top-1 bg-primary text-primary-foreground text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {badge}
          </span>
        )}
        {collapsed && (
          <span className="sr-only">{label}</span>
        )}
      </Button>
    );
  };

  return (
    <div
      className={cn(
        "h-screen bg-card text-card-foreground flex flex-col border-r transition-all duration-300 relative shadow-md",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border shadow-md bg-background z-10"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <div className="p-4 flex items-center border-b">
        {!collapsed && (
          <>
            <BadgeIndianRupee className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-bold flex-1">AssetVista</h1>
          </>
        )}
        {collapsed && (
          <div className="flex justify-center w-full">
            <BadgeIndianRupee className="h-6 w-6 text-primary" />
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="border-b p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs text-muted-foreground">Sana</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        <div className="mb-6">
          {!collapsed && <p className="text-xs uppercase text-muted-foreground mb-2 pl-2">Overview</p>}
          <NavItem icon={LayoutDashboard} label="Dashboard" path="/" badge="3" />
          <NavItem icon={FileBarChart} label="Reports" path="/reports" />
          <NavItem icon={FileText} label="Audit Logs" path="/audit-logs" />
        </div>

        <div className="mb-6">
          {!collapsed && <p className="text-xs uppercase text-muted-foreground mb-2 pl-2">Asset Management</p>}
          <NavItem 
            icon={PlusSquare} 
            label="Add Asset" 
            onClick={() => setAddAssetDialogOpen(true)} 
          />
          <NavItem icon={Building2} label="Buildings" path="/buildings" />
          <NavItem icon={Computer} label="IT Assets" path="/it-assets" />
          <NavItem icon={BookOpen} label="Intangibles" path="/intangibles" />
          <NavItem icon={Map} label="Land" path="/land" />
          <NavItem icon={Package} label="Inventory" path="/inventory" />
          <NavItem icon={Building} label="Plant & Machinery" path="/plant-machinery" />
        </div>

        <div className="mb-6">
          {!collapsed && <p className="text-xs uppercase text-muted-foreground mb-2 pl-2">Administration</p>}
          <NavItem icon={Users} label="Users" path="/users" />
          <NavItem icon={Settings} label="Settings" path="/settings" />
        </div>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        {!collapsed && <ThemeSwitcher />}
        <Button
          variant="ghost" 
          size={collapsed ? "icon" : "default"}
          className="text-card-foreground hover:text-card-foreground hover:bg-destructive/10 hover:text-destructive"
          onClick={logout}
        >
          <LogOut className={cn("h-5 w-5", collapsed ? "" : "mr-2")} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>

      {/* Add Asset Dialog */}
      <Dialog open={addAssetDialogOpen} onOpenChange={setAddAssetDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>Enter the details of the new asset below.</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="asset_name">Asset Name</Label>
                <Input 
                  id="asset_name" 
                  name="asset_name" 
                  value={newAsset.asset_name} 
                  onChange={handleInputChange} 
                  placeholder="Enter asset name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="asset_type">Asset Type</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("asset_type", value)}
                  defaultValue={newAsset.asset_type}
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
                  onChange={handleInputChange} 
                  placeholder="Enter location"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purchase_date">Purchase Date</Label>
                <Input 
                  id="purchase_date" 
                  name="purchase_date" 
                  type="date" 
                  value={newAsset.purchase_date}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="purchase_value">Purchase Value (₹)</Label>
                <Input 
                  id="purchase_value" 
                  name="purchase_value" 
                  type="number" 
                  value={newAsset.purchase_value.toString()} 
                  onChange={handleInputChange} 
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
            <Button variant="outline" onClick={() => setAddAssetDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAsset}>Add Asset</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
