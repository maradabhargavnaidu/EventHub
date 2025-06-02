import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Announcements from "@/components/dashboard/Announcements";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import StatisticsOverview from "@/components/dashboard/StatisticsOverview";

import DashboardNav from "./DashboardNav";
import { outletContext } from "@/types/types";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  // useEffect(() => {}, []);
  const { events } = useOutletContext<outletContext>();
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <div className="container mx-auto p-4">
        <DashboardNav title="Dashboard" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UpcomingEvents events={events} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecentActivity />
              <Announcements />
            </div>
          </div>

          {/* Sidebar content - 1/3 width on large screens */}
          <div className="space-y-6">
            <StatisticsOverview events={events} />
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
