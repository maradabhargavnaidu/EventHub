import { Calendar, MapPin, Share2, Edit3, Trash2, Bell } from "lucide-react";
import { format, parseISO } from "date-fns";
import { useOutletContext } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { outletContext } from "@/types/types";
import { getStatus, getStatusColor } from "@/lib/utils";

// // Mock data for demonstration
// const mockEvents = [
//   {
//     _id: "1",
//     title: "Team Meeting",
//     description:
//       "Weekly team sync to discuss project progress and upcoming deadlines",
//     startDateTime: "2024-12-10T10:00:00Z",
//     endDateTime: "2024-12-10T11:00:00Z",
//     type: "online",
//     onlineLink: "https://meet.google.com/abc-def-ghi",
//   },
//   {
//     _id: "2",
//     title: "Product Launch Event",
//     description:
//       "Official launch event for our new product line with stakeholders and media",
//     startDateTime: "2024-12-15T14:00:00Z",
//     endDateTime: "2024-12-15T18:00:00Z",
//     type: "physical",
//     venueName: "Convention Center",
//     address: "123 Main Street, Downtown",
//   },
//   {
//     _id: "3",
//     title: "Workshop: React Best Practices",
//     description:
//       "Learn advanced React patterns and best practices for scalable applications",
//     startDateTime: "2024-12-05T09:00:00Z",
//     endDateTime: "2024-12-05T17:00:00Z",
//     type: "physical",
//     venueName: "Tech Hub",
//     address: "456 Innovation Drive",
//   },
//   {
//     _id: "4",
//     title: "Annual Tech Conference",
//     description:
//       "Three-day conference featuring the latest in technology trends and innovations",
//     startDateTime: "2024-12-20T09:00:00Z",
//     endDateTime: "2024-12-22T18:00:00Z",
//     type: "physical",
//     venueName: "Grand Convention Center",
//     address: "789 Conference Blvd, Tech District",
//   },
// ];

function formatDate(dateISO: string): string {
  const date = parseISO(dateISO);
  return format(date, "do MMMM yyyy");
}

function formatTime(dateISO: string): string {
  const date = parseISO(dateISO);
  return format(date, "h:mm a");
}

// function getStatusColor(status: string) {
//   switch (status) {
//     case "Upcoming":
//       return "bg-purple-400 text-purple-900 border-purple-300";
//     case "Completed":
//       return "bg-gray-500 text-gray-100 border-gray-400";
//     case "Ongoing":
//       return "bg-blue-400 text-blue-900 border-blue-300";
//     default:
//       return "bg-gray-500 text-gray-100 border-gray-400";
//   }
// }
// bg-gradient-to-br from-gray-800 to-gray-900

export default function YourEvents() {
  const { events } = useOutletContext<outletContext>();
  // const events = mockEvents;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DashboardNav title="Your Events" />

        {!events || events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="mx-auto h-16 w-16 text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Create your first event to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events?.map((event) => {
              const status = getStatus(
                event?.startDateTime,
                event?.endDateTime
              );

              return (
                <div
                  key={event?._id}
                  className="group relative  bg-[#252525]  rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-400/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Header with Status and Actions */}
                  <div className="relative p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          status
                        )}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                        {status}
                      </span>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          title="Set Reminder"
                          className="p-2 rounded-lg hover:bg-purple-400/20 hover:text-purple-400 text-gray-400 transition-colors duration-200"
                        >
                          <Bell size={16} />
                        </button>
                        <button
                          title="Edit Event"
                          className="p-2 rounded-lg hover:bg-blue-400/20 hover:text-blue-400 text-gray-400 transition-colors duration-200"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          title="Share Event"
                          className="p-2 rounded-lg hover:bg-green-400/20 hover:text-green-400 text-gray-400 transition-colors duration-200"
                        >
                          <Share2 size={16} />
                        </button>
                        <button
                          title="Delete Event"
                          className="p-2 rounded-lg hover:bg-red-400/20 hover:text-red-400 text-gray-400 transition-colors duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Event Title */}
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 leading-tight">
                      {event?.title}
                    </h3>

                    {/* Event Description */}
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-6">
                      {event?.description}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="px-6 pb-6 space-y-4">
                    {/* Date and Time Section */}
                    {(() => {
                      if (!event || !event.startDateTime || !event.endDateTime)
                        return null;
                      const startDate = parseISO(event?.startDateTime);
                      const endDate = parseISO(event?.endDateTime);
                      const isSameDay =
                        format(startDate, "yyyy-MM-dd") ===
                        format(endDate, "yyyy-MM-dd");

                      if (isSameDay) {
                        return (
                          <div className="flex items-center text-sm">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-400/20 mr-3">
                              <Calendar size={16} className="text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-gray-300 font-medium">
                                {formatDate(event?.startDateTime)}
                              </div>
                              <div className="text-gray-500 text-xs">
                                {formatTime(event?.startDateTime)} -{" "}
                                {formatTime(event?.endDateTime)}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        // Multi-day event - show start and end dates separately
                        return (
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-400/20 mr-3">
                                <Calendar
                                  size={16}
                                  className="text-purple-400"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-gray-300 font-medium">
                                  Starts: {formatDate(event?.startDateTime)}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {formatTime(event?.startDateTime)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center text-sm">
                              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/20 mr-3">
                                <Calendar size={16} className="text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <div className="text-gray-300 font-medium">
                                  Ends: {formatDate(event?.endDateTime)}
                                </div>
                                <div className="text-gray-500 text-xs">
                                  {formatTime(event?.endDateTime)}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })()}

                    {/* Location */}
                    <div className="flex items-center text-sm">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-400/20 mr-3">
                        <MapPin size={16} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        {event?.type === "online" ? (
                          <div>
                            <div className="text-gray-300 font-medium">
                              Online Event
                            </div>
                            <div className="text-gray-500 text-xs truncate">
                              {event?.onlineLink || "Link will be shared"}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-gray-300 font-medium">
                              {event?.venueName || "Venue TBA"}
                            </div>
                            <div className="text-gray-500 text-xs">
                              {event?.address || "Address TBD"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Gradient Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
