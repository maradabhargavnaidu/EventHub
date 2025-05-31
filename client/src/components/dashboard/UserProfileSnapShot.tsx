import React, { useState } from "react";
import { LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

const UserProfileSnapshot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useAuth();
  const user = {
    name: state?.name,
    role: state?.role,
    // organization: state?.organization,
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
  };

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#2d2d2d] transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className=" flex items-center justify-center w-10 h-10 bg-purple-600 text-white text-xl font-semibold rounded-full">
          <AvatarFallback>
            {state?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium leading-tight">{user.name}</p>
          <p className="text-xs text-gray-400 leading-tight">{user.role}</p>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#2d2d2d] border border-gray-700 overflow-hidden z-10">
          <div className="p-3 border-b border-gray-700">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-400">{user.role}</p>
            {/* <p className="text-xs text-gray-500">{user.organization}</p> */}
          </div>
          <div className="py-1">
            <button className="flex items-center px-4 py-2 text-sm hover:bg-[#3d3d3d] w-full text-left transition-colors duration-150">
              <Settings size={16} className="mr-2" />
              Edit Profile
            </button>
            <button
              onClick={() => dispatch({ type: "LOGOUT" })}
              className="flex items-center px-4 py-2 text-sm hover:bg-[#3d3d3d] w-full text-left text-red-400 transition-colors duration-150"
            >
              <LogOut size={16} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileSnapshot;
