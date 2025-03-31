import { UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Payload } from "../types/types";

interface DropDownProps {
  setDropDownOpen: (open: boolean) => void;
  dropdownOpen: boolean;
  state: { mail: string; fullName: string };
  dispatch: React.Dispatch<
    { type: "LOGIN"; payload: Payload } | { type: "LOGOUT" }
  >;
}
const DropDown: React.FC<DropDownProps> = ({
  setDropDownOpen,
  dropdownOpen,
  state,
  dispatch,
}) => {
  return (
    <div className="absolute right-0 mt-2 w-60 bg-[#1e1e1e] shadow-xl rounded-md overflow-hidden border border-[#333333]">
      {/* Header section with avatar and user info */}
      <div className="p-3 border-b border-[#333333]">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <UserCircle2
              color="white"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              width={36}
              height={36}
              onClick={() => setDropDownOpen(!dropdownOpen)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {state.mail}
            </p>
            <p className="text-xs text-gray-400 truncate">{state.fullName}</p>
          </div>
        </div>
      </div>

      {/* Menu options */}
      <div className="py-2" onClick={() => setDropDownOpen(true)}>
        <Link
          to="/profile"
          className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-[#2a2a2a] hover:text-white transition-colors duration-150"
        >
          <span>Profile</span>
        </Link>

        <div className="my-1 border-t border-[#333333]"></div>

        <button
          className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-[#2a2a2a] hover:text-red-300 transition-colors duration-150"
          onClick={() => {
            setDropDownOpen(true);
            dispatch({ type: "LOGOUT" });
          }}
        >
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DropDown;
