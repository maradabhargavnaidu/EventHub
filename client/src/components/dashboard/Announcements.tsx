import React from "react";
import { Bell, Info, AlertTriangle } from "lucide-react";

const Announcements: React.FC = () => {
  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: "System Maintenance",
      message:
        "Scheduled maintenance on April 10. System may be down for 2 hours.",
      type: "info",
      time: "Today",
    },
    {
      id: 2,
      title: "New Feature",
      message: "Event analytics dashboard is now available to all organizers.",
      type: "success",
      time: "Yesterday",
    },
    {
      id: 3,
      title: "Important Update",
      message:
        "Please update your event details to comply with new regulations.",
      type: "warning",
      time: "3 days ago",
    },
  ];

  // Helper function to get announcement icon
  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info size={16} className="text-blue-400" />;
      case "success":
        return <Bell size={16} className="text-green-400" />;
      case "warning":
        return <AlertTriangle size={16} className="text-yellow-400" />;
      default:
        return <Info size={16} className="text-blue-400" />;
    }
  };

  // Helper function to get announcement style
  const getAnnouncementStyle = (type: string) => {
    switch (type) {
      case "info":
        return "border-l-blue-500 bg-blue-500/10";
      case "success":
        return "border-l-green-500 bg-green-500/10";
      case "warning":
        return "border-l-yellow-500 bg-yellow-500/10";
      default:
        return "border-l-blue-500 bg-blue-500/10";
    }
  };

  return (
    <div className="bg-[#252525] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Announcements</h2>
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`border-l-4 px-3 py-2 rounded-r-md ${getAnnouncementStyle(
              announcement.type
            )}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                {getAnnouncementIcon(announcement.type)}
                <h3 className="text-sm font-medium ml-2">
                  {announcement.title}
                </h3>
              </div>
              <span className="text-xs text-gray-400">{announcement.time}</span>
            </div>
            <p className="text-xs text-gray-300 mt-1 ml-6">
              {announcement.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
