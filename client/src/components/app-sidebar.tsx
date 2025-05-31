import {
  Calendar,
  CalendarPlus,
  ChevronUp,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Events",
    url: "/create-event",
    icon: CalendarPlus,
  },

  {
    title: "Log out",
    url: "/",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const { state, dispatch } = useAuth();

  return (
    <Sidebar collapsible="icon" className=" backdrop-blur-lg">
      <SidebarHeader className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        <SidebarMenu>
          <SidebarMenuButton className="hover:bg-[#1e1e1e]/2">
            <SidebarMenuItem>
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
                    {item.title === "Log out" ? (
                      <button
                        onClick={() => {
                          dispatch({ type: "LOGOUT" });
                          // Optional: redirect to login/home
                          window.location.href = "/";
                        }}
                        className="flex items-center space-x-2 w-full text-left cursor-pointer"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-[#1e1e1e]/2 text-white hover:text-white">
                  <User className="w-5 h-5 text-white" /> {state?.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="relative z-[9999] w-[300px] bg-white text-black"
              >
                <DropdownMenuItem className="text-black">
                  <span className="text-black">Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
