import React from "react";
import { CalendarPlus, UserPlus, Settings, AlertCircle } from "lucide-react";

const RecentActivity: React.FC = () => {
  // Mock data for activities
  const activities = [
    {
      id: 1,
      message: 'You created "Tech Conference 2025"',
      time: "2 hours ago",
      icon: CalendarPlus,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      id: 2,
      message: '100 new registrations for "Product Launch Webinar"',
      time: "4 hours ago",
      icon: UserPlus,
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    {
      id: 3,
      message: 'Venue "New York Tech Hub" was updated',
      time: "Yesterday",
      icon: Settings,
      iconBg: "bg-orange-500/20",
      iconColor: "text-orange-400",
    },
    {
      id: 4,
      message: 'Reminder: Finalize "UI/UX Workshop" details',
      time: "2 days ago",
      icon: AlertCircle,
      iconBg: "bg-purple-500/20",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="bg-[#252525] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-full ${activity.iconBg} ${activity.iconColor} mt-1`}
            >
              <activity.icon size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-200">{activity.message}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
