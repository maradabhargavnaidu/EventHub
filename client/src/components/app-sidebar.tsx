import {
  Calendar,
  Calendar1,
  CalendarPlus,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Events",
    url: "/create",
    icon: CalendarPlus,
  },
  {
    title: "Your Events",
    url: "/your-events",
    icon: Calendar1,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className=" backdrop-blur-lg">
      <SidebarHeader className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        <SidebarMenu>
          <SidebarMenuButton className="hover:bg-[#1e1e1e]/2">
            <SidebarMenuItem className="">
              <Link to="/" className="flex items-center justify-between gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                  EventHub
                </span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="text-blue-400" />
                      <span className="font-medium ">{item.title}</span>
                    </Link>
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
