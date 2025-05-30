import { useEffect, useState } from "react";
import { Button } from "../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/card";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { api } from "../config/api";
import { toast } from "sonner";

interface Event {
  _id: string;
  title: string;
  dateTime: string;
  address: string;
  description: string;
}

export default function Dashboard() {
  const { state } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const getEvents = async () => {
    try {
      if (state?.role == "host") {
        const res = await api.get("/events/get-your-events");
        setEvents(res.data);
        toast.success("Got the events. You're good to go!");
      } else {
        const res = await api.get("/events/get-events");
        setEvents(res.data);
        toast.success("Got the events. You're good to go!");
      }
    } catch (err) {
      toast.error("Oops! Failed to load events. Please try again.");
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="h-screen bg-[#1e1e1e] text-white pt-14 mx-auto px-5">
      {/* {loading && <Loader />} */}
      {/* Sidebar */}
      <Sidebar />
      {/* <div className="flex justify-center items-center">
        <div className="py-4 w-auto  bottom-5 bg-zinc-900 rounded-4xl items-center border-2 px-4 border-white-800">
          <div className="flex flex-col items-center gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span className="sr-only">Dashboard</span>
            </Button>
            <Link to={"/create"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="M8 14h.01" />
                  <path d="M12 14h.01" />
                  <path d="M16 14h.01" />
                  <path d="M8 18h.01" />
                  <path d="M12 18h.01" />
                  <path d="M16 18h.01" />
                </svg>
                <span className="sr-only">Events</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" x2="9" y1="12" y2="12" />
              </svg>
              <span className="sr-only">Sign Out</span>
            </Button>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {state?.role == "host" ? (
            <h1 className="text-2xl font-bold mb-8">Your Events</h1>
          ) : (
            <h1 className="text-2xl font-bold mb-8">Events for you</h1>
          )}

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card
                  key={event._id}
                  className="hover:border-zinc-700 transition-all"
                >
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {event.dateTime.split("T")[0]}
                    </CardDescription>
                    <CardDescription>
                      {event.dateTime.split("T")[1]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/view-event/${event._id}`}>
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer"
                      >
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : state?.role === "host" ? (
            <Card className="hover:border-zinc-700 transition-all">
              <CardHeader>
                <CardTitle>No Events Found</CardTitle>
                <CardDescription>
                  Create your first event to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="bg-zinc-800 rounded-full p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-zinc-300"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                </div>
                <p className="text-zinc-300 text-center max-w-md mb-6">
                  You don't have any events yet. Create your first event to
                  start organizing and managing your schedule.
                </p>
                <Link to="/create">
                  <Button className="bg-white text-black hover:bg-zinc-200 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 mr-2"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Create Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Events Found</CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
