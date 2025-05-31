import React from "react";
import { Users, Calendar, DollarSign, BarChart } from "lucide-react";
// import { DonutChart } from './Charts/DonutChart';

const StatisticsOverview: React.FC = () => {
  // Mock data for statistics
  const stats = [
    { title: "Total Events", value: "24", icon: Calendar, change: "+3" },
    { title: "Total Attendees", value: "1,240", icon: Users, change: "+168" },
    { title: "Revenue", value: "$12,400", icon: DollarSign, change: "+$2,100" },
  ];

  // Mock data for attendance chart
  //   const attendanceData = {
  //     labels: ["Attended", "No-shows"],
  //     values: [75, 25],
  //     colors: ["#3b82f6", "#6b7280"],
  //   };

  return (
    <div className="bg-[#252525] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Statistics Overview</h2>
        <BarChart size={20} className="text-gray-400" />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-[#2d2d2d] rounded-lg border border-gray-700 transition-all duration-300 hover:border-gray-500"
          >
            <div className="flex items-center">
              <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 mr-3">
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </div>
            <div className="text-green-400 text-sm font-medium">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Attendance Rate</h3>
        <div className="flex items-center justify-between">
          <div className="w-28 h-28">
            {/* <DonutChart data={attendanceData} /> */}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-sm">Attended (75%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
              <span className="text-sm">No-shows (25%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsOverview;
