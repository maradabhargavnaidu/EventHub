import { useState } from "react";
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

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function Dashboard() {
  const { dispatch } = useAuth();
  const [events, setEvents] = useState<Event[]>([
    // {
    //   id: "1",
    //   title: "Tech Conference 2024",
    //   date: "June 15, 2024",
    //   location: "San Francisco, CA",
    //   description:
    //     "Join us for the biggest tech conference of the year featuring keynotes from industry leaders.",
    // },
    // {
    //   id: "2",
    //   title: "Design Workshop",
    //   date: "July 10, 2024",
    //   location: "Online",
    //   description:
    //     "Learn the latest design trends and tools in this interactive workshop.",
    // }
  ]);

  // Toggle this to test the empty state
  // const [events, setEvents] = useState<Event[]>([])

  return (
    <div className=" h-screen bg-[#1e1e1e] text-white pt-14">
      {/* Sidebar */}
      <div className="flex justify-center items-center">
        <div className="py-4 w-auto fixed bottom-5 bg-zinc-900 rounded-4xl items-center border-2 px-8 border-white-800">
          <div className="flex items-center gap-8">
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

            <div className="">
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Your Events</h1>

          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card
                  key={event.id}
                  className="hover:border-zinc-700 transition-all"
                >
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>
                      {event.date} • {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
