
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
  Edit3
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";

export function Sidebar() {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const NavItem = ({ 
    icon: Icon, 
    label, 
    path,
    badge,
  }: { 
    icon: React.ElementType; 
    label: string; 
    path: string;
    badge?: string;
  }) => {
    const isActive = location.pathname === path;
    
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start mb-1 relative group",
          isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "",
          collapsed ? "px-2" : ""
        )}
        onClick={() => handleNavigation(path)}
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
          {!collapsed && <p className="text-xs uppercase text-muted-foreground mb-2 pl-2">Asset Classes</p>}
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
    </div>
  );
}
