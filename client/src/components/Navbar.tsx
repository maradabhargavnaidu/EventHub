import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
// import DropDown from "./DropDown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useAuth();
  // const [dropdownOpen] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigation = [
    { name: "Home", href: "/" },
    // { name: "About", href: "/about" },
    // { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    // { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-[#1E1E1E]/80 backdrop-blur-lg border-b border-gray-800">
      <nav className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
          >
            <Calendar className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 ml-4 relative">
              {state?.isAuthenticated ? (
                // <div className="relative">
                //   <UserCircle2
                //     color="white"
                //     className="cursor-pointer"
                //     width={30}
                //     height={30}
                //     onClick={() => setDropdownOpen(!dropdownOpen)}
                //   />

                //   {/* {!dropdownOpen && (
                //     <DropDown
                //       setDropDownOpen={() => setDropdownOpen(dropdownOpen)}
                //       dropdownOpen={dropdownOpen}
                //       state={state}
                //       dispatch={dispatch}
                //     />
                //   )} */}
                // </div>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/get-started"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
                >
                  Get started
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-lg p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {state?.isAuthenticated ? (
                  <div className="space-y-2 pt-4">
                    <Link
                      to="/login"
                      className="block w-full rounded-lg px-3 py-2 text-center text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full rounded-lg px-3 py-2 text-center text-base font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Get started
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 pt-4">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
                {/* <div className="space-y-2 pt-4">
                  <Link
                    to="/login"
                    className="block w-full rounded-lg px-3 py-2 text-center text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full rounded-lg px-3 py-2 text-center text-base font-medium bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get started
                  </Link>
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
