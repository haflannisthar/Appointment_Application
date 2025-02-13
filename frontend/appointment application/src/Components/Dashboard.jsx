import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import CreateAppointment from "./CreateAppointment";
import BookAppointment from "./BookAppointment";
import BookedAppointment from "./BookedAppointment";

function Dashboard() {
  // states user, role and method logout from auth context 
  const { user, role, logout } = useContext(AuthContext);
  // navigate hook to navigate between routes
  const navigate = useNavigate();
  // State to manage the active tab (the current view being shown)
  const [activeTab, setActiveTab] = useState("booked");
  // State to manage the visibility of the user profile dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Reference for the dropdown to handle clicks outside the dropdown area
  const dropdownRef = useRef(null);

// / Function to handle logout
  const handleLogout = async () => {
    const response = confirm("Are you sure you want to logout?");
    if (response) {
      const success = await logout();
      if (success) {
        navigate("/login");
      }
    }
  };
// // Function to handle tab changes (which tab is active)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };



  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the dropdownRef
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
// Attach the event listener on mount
    document.addEventListener("mousedown", handleClickOutside);
    // clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-3 ">


      <ul className="flex flex-wrap  justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-center text-gray-500  mx-auto dark:divide-gray-700 dark:text-gray-400">
        {["booked", "book", role === "ADMIN" ? "create" : null].map((tab) =>
          tab ? (
            <li key={tab}>
              <button
                className={`px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 ${activeTab === tab ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : ""
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "booked" ? "Booked Appointments" : tab === "book" ? "Book Appointment" : "Create Appointment"}
              </button>
            </li>
          ) : null
        )}

        {/* User Profile Dropdown */}
        <li ref={dropdownRef} className="relative z-20">
          <button
            className="px-3 py-2 sm:px-4 sm:py-3 flex flex-col items-center border border-gray-200 dark:border-gray-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <UserCircleIcon className="w-4 h-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-300" />
            {/* <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{user}</p> */}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="px-4 py-3 text-center">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user}</p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700"></div>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>

      {/* Tab Content */}
      <div className="p-4 max-w-4xl mx-auto">
        {/* Tabs Content */}
        {activeTab === "booked" && (<BookedAppointment />)}
        {activeTab === "book" && (<BookAppointment onBookSuccess={() => handleTabChange("booked")} />)}
        {activeTab === "create" && (<CreateAppointment />)}
      </div>
    </div>
  );
}

export default Dashboard;
