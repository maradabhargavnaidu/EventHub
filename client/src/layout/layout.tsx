import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Outlet } from "react-router-dom";
import { api } from "@/config/api";
import { useQuery } from "@tanstack/react-query";

// import Navbar from "@/components/home/Navbar";

export default function Layout() {
  const fetchEvents = async () => {
    const response = await api.get(
      "http://localhost:5000/api/events/get-your-events"
    );
    return response.data;
  };
  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-[100%]">
        {/* <SidebarTrigger className="w-[100%] bg-[#1E1E1E] text-white" /> */}
        {/* <Navbar /> */}

        <Outlet context={{ events, isLoading }} />
      </main>
    </SidebarProvider>
  );
}
