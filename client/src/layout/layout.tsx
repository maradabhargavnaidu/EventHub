import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Outlet } from "react-router-dom";
// import Navbar from "@/components/home/Navbar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-[100%]">
        {/* <SidebarTrigger className="w-[100%] bg-[#1E1E1E] text-white" /> */}
        {/* <Navbar /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
