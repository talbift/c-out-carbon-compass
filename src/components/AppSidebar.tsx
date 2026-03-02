import { LayoutDashboard, BarChart2, TrendingUp, Zap, Factory } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Vue d'ensemble", url: "/", icon: LayoutDashboard },
  { title: "Analyse Historique", url: "/analyse", icon: BarChart2 },
  { title: "Prévisions 2030", url: "/previsions", icon: TrendingUp },
  { title: "Simulateur CBAM", url: "/cbam", icon: Zap },
  { title: "Secteurs à Risque", url: "/secteurs", icon: Factory },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">C'out</span>
          {!collapsed && (
            <span className="text-xs text-muted-foreground font-body">🌱 Carbon Out</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      activeClassName="bg-accent text-primary font-medium"
                    >
                      <item.icon size={20} className="shrink-0" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <p className="text-[10px] text-muted-foreground text-center">
            © 2026 C'out Team<br />All Rights Reserved
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
