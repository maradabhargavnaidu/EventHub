import React from "react";

import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Announcements from "@/components/dashboard/Announcements";
import UserProfileSnapshot from "@/components/dashboard/UserProfileSnapShot";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import StatisticsOverview from "@/components/dashboard/StatisticsOverview";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-5">
            <SidebarTrigger className="cursor-pointer" />
            <h3 className="text-xl font-bold">Dashboard</h3>
          </div>

          <UserProfileSnapshot />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-6">
            <UpcomingEvents />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentActivity />
              <Announcements />
            </div>
          </div>

          {/* Sidebar content - 1/3 width on large screens */}
          <div className="space-y-6">
            <StatisticsOverview />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
