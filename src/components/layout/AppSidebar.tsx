import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Users, 
  Settings, 
  PieChart,
  Wallet,
  Bell
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Invoices", url: "/invoices", icon: FileText, badge: "12" },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Clients", url: "/clients", icon: Users },
];

const adminNavItems = [
  { title: "Admin Panel", url: "/admin", icon: PieChart },
  { title: "Analytics", url: "/analytics", icon: Wallet },
];

const bottomNavItems = [
  { title: "Notifications", url: "/notifications", icon: Bell, badge: "3" },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavClass = (isActive: boolean) => 
    isActive 
      ? "bg-gradient-primary text-white shadow-medium hover:bg-gradient-primary" 
      : "hover:bg-muted/80 transition-smooth";

  return (
    <Sidebar className="border-r shadow-soft">
      <SidebarHeader className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg ">
                Inflow360
              </h2>
              <p className="text-xs text-muted-foreground">Invoice Manager</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(isActive(item.url))}>
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto bg-accent-orange text-white">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground mb-2">
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(isActive(item.url))}>
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(isActive(item.url))}>
                    <NavLink to={item.url} className="flex items-center gap-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-auto bg-accent-orange text-white">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}