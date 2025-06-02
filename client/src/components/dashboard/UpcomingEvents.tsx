import { Calendar, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for events
const eventsMockData = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "May 15, 2025",
    location: "San Francisco Convention Center",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Product Launch Webinar",
    date: "April 10, 2025",
    location: "Virtual Event",
    status: "active",
  },
  {
    id: 3,
    name: "Annual Developers Meetup",
    date: "June 22, 2025",
    location: "New York Tech Hub",
    status: "upcoming",
  },
  {
    id: 4,
    name: "UI/UX Workshop Series",
    date: "April 5, 2025",
    location: "Chicago Design Center",
    status: "cancelled",
  },
];

const UpcomingEvents = ({ events }: { events: any[] }) => {
  // Helper function to get status badge style
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "upcoming":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    }
  };

  return (
    <div className="bg-[#252525] rounded-lg p-5 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <Link
          to={"/create"}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-3 py-1.5 rounded-md text-sm"
        >
          <Plus size={16} />
          <span>Create Event</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4  ">
        {events?.map((event) => (
          <div
            key={event.id}
            className="bg-[#2d2d2d] rounded-lg p-4 border border-gray-700 transition-all duration-300 hover:border-gray-500 cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-lg text-white">{event.title}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                  event.status
                )}`}
              >
                {/* {event.status.charAt(0).toUpperCase() + event.status.slice(1)} */}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-gray-400">
                <Calendar size={16} className="mr-2" />
                <span>{event?.startDateTime}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-2" />
                {event?.type === "online" ? (
                  <div>
                    <div className="text-gray-300 font-medium">
                      Online Event
                    </div>
                    <div className="text-gray-500 text-xs truncate">
                      {event.onlineLink || "Link will be shared"}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-gray-300 font-medium">
                      {event.venueName || "Venue TBA"}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {event.address || "Address TBD"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
