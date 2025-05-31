import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Outlet } from "react-router-dom";
// import Navbar from "./components/home/Navbar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {/* <Navbar /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
