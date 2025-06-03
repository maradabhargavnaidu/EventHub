import { getStatus, getStatusColor } from "@/lib/utils";
import { Calendar, MapPin, Plus } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for events
// const eventsMockData = [
//   {
//     id: 1,
//     name: "Tech Conference 2025",
//     date: "May 15, 2025",
//     location: "San Francisco Convention Center",
//     status: "upcoming",
//   },
//   {
//     id: 2,
//     name: "Product Launch Webinar",
//     date: "April 10, 2025",
//     location: "Virtual Event",
//     status: "active",
//   },
//   {
//     id: 3,
//     name: "Annual Developers Meetup",
//     date: "June 22, 2025",
//     location: "New York Tech Hub",
//     status: "upcoming",
//   },
//   {
//     id: 4,
//     name: "UI/UX Workshop Series",
//     date: "April 5, 2025",
//     location: "Chicago Design Center",
//     status: "cancelled",
//   },
// ];

const UpcomingEvents = ({ events }: { events: any[] }) => {
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
        {events?.map((event) => {
          const status = getStatus(event?.startDateTime, event?.endDateTime);
          return (
            <div
              key={event.id}
              className="bg-[#2d2d2d] rounded-lg p-4 border border-gray-700 transition-all duration-300 hover:border-gray-500 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-lg text-white">
                  {event.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    event.status
                  )}`}
                >
                  {status}
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
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
