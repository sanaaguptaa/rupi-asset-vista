
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Home, 
  Box, 
  Building, 
  Computer, 
  BookOpen, 
  Database, 
  Map, 
  Settings, 
  Menu, 
  LogOut 
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ 
    icon: Icon, 
    label, 
    active = false 
  }: { 
    icon: React.ElementType; 
    label: string; 
    active?: boolean;
  }) => (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start mb-1",
        active ? "bg-secondary" : "",
        collapsed ? "px-2" : ""
      )}
    >
      <Icon className="h-5 w-5 mr-2" />
      {!collapsed && <span>{label}</span>}
    </Button>
  );

  return (
    <div
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold flex-1 text-sidebar-foreground">AssetVista</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        <NavItem icon={Home} label="Dashboard" active />
        <NavItem icon={BarChart3} label="Reports" />
        <NavItem icon={Box} label="Assets" />
        <NavItem icon={Building} label="Buildings" />
        <NavItem icon={Computer} label="IT Equipment" />
        <NavItem icon={BookOpen} label="Intangibles" />
        <NavItem icon={Map} label="Land" />
        <NavItem icon={Database} label="Inventory" />
        <NavItem icon={Settings} label="Settings" />
      </div>

      <div className="p-4 border-t border-sidebar-border flex items-center justify-between">
        {!collapsed && <ThemeSwitcher />}
        <Button
          variant="ghost" 
          size={collapsed ? "icon" : "default"}
          className="text-sidebar-foreground hover:text-sidebar-foreground"
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}
