import { Link } from "react-router-dom";
import Button from "../utils/Button";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

const Sidebar = () => {
  const { state, dispatch } = useAuth();
  return (
    <div className="flex justify-center items-center ">
      <div className="py-4 w-auto  bottom-0 bg-zinc-900 fixed rounded-4xl items-center border-2 px-8 border-white-800">
        <div className="flex  items-center gap-8">
          <Link to={"/dashboard"}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white"
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
          </Link>
          {state?.role === "host" && (
            <Link to={"/create"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full curosr-pointer bg-zinc-800 hover:bg-zinc-700 text-white"
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
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              toast.success(
                "See you soon! You’ve been logged out successfully."
              );
            }}
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
  );
};
export default Sidebar;
