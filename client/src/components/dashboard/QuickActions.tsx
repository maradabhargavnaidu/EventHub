import React from "react";
import { CalendarPlus, Users, MapPin, MessageSquare } from "lucide-react";

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "Create Event",
      icon: CalendarPlus,
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    {
      title: "View Registrations",
      icon: Users,
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Manage Venues",
      icon: MapPin,
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/30",
    },
    {
      title: "View Feedback",
      icon: MessageSquare,
      bgColor: "bg-green-500/10",
      iconColor: "text-green-400",
      borderColor: "border-green-500/30",
    },
  ];

  return (
    <div className="bg-[#252525] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${action.bgColor} border ${action.borderColor} transition-all hover:scale-105 duration-300`}
          >
            <action.icon className={`${action.iconColor} mb-2`} size={22} />
            <span className="text-sm font-medium text-gray-100">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
