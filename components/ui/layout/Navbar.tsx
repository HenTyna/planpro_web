import { useFetchProfile } from "@/lib/hooks/useFetchProfile";
import profile from "@/public/asset/profile.jpg";
import { Bell, ChevronDown, Globe, HelpCircle, LogOut, Menu, Moon, Search, Settings, Sun, UserIcon } from 'lucide-react';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProfileContrainer from "../profile/ProfileContrainer";
interface NavBarProps {
  toggleSidebar: () => void
  currentTheme: {
    color: string
    ring: string
    name: string
    gradient: string
  }
  isDarkMode?: boolean
  toggleDarkMode?: () => void
}

const NavBar: React.FC<NavBarProps> = ({
  toggleSidebar,
  currentTheme,
  isDarkMode = false,
  toggleDarkMode = () => { },
}) => {

  const {data, isError, isLoading} = useFetchProfile();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)
  const [showProfile, setShowProfile] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Sample notifications
  const notifications = [
    {
      id: 1,
      title: "New message",
      description: "You have a new message from John Doe",
      time: "5 min ago",
      isRead: false,
    },
    {
      id: 2,
      title: "System update",
      description: "Gemini Chat has been updated to version 2.0",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 3,
      title: "Welcome!",
      description: "Welcome to Gemini Chat. Start a conversation now!",
      time: "2 days ago",
      isRead: true,
    },
  ]
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      window.location.href = "/login"; // Replace with your actual logout URL
    }
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error..!</div>;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4 flex items-center justify-between shadow-sm z-20">
      {/* Left section - Menu and search */}
      <div className="flex items-center">
        {/* Menu button */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 mr-3 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Logo */}
        <div className="hidden md:flex items-center mr-6">
          <div
            className={`bg-gradient-to-r  p-1.5 rounded-lg shadow-sm mr-2 flex items-center justify-center`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${isSearchFocused ? `text-${currentTheme?.name.toLowerCase()}-500` : "text-gray-400"
              }`}
          />
          <input
            type="text"
            placeholder="Search..."
            className={`pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none transition-all duration-300 w-48 md:w-64 lg:w-80
              ${isSearchFocused
                ? `border-${currentTheme?.name?.toLowerCase()}-500 ring-2 ring-${currentTheme?.name?.toLowerCase()}-200 bg-white dark:bg-gray-700`
                : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
              }
              text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
            `}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right section - Control icons */}
      <div className="flex items-center space-x-1 md:space-x-2">
        {/* Dark mode toggle */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleDarkMode}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative transition-colors"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-600 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notifications dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700 z-10 transition-all duration-200 animate-fadeIn">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications?.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-2 ${notification.isRead
                      ? "border-transparent"
                      : `border-${currentTheme?.name?.toLowerCase()}-500`
                      } transition-colors`}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">{notification?.title}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification?.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification?.description}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Language selector */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden sm:flex"
          aria-label="Change language"
        >
          <Globe size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* User profile */}
        <div className="relative ml-1" ref={dropdownRef}>
          <button
            className="flex items-center p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <div
              className={`h-8 w-8 rounded-full overflow-hidden flex items-center justify-center border-2 ${isDropdownOpen ? `border-${currentTheme?.name?.toLowerCase()}-500` : "border-gray-200 dark:border-gray-600"
                }`}
            >
              <Image
                src={ data?.profile_image_url || profile}
                alt="User avatar"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <ChevronDown
              size={16}
              className={`ml-1 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-gray-800 dark:text-white" : "text-gray-400 dark:text-gray-500"
                }`}
            />
          </button>

          {/* Dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-10 transition-all duration-200 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{`${data?.first_name} ${data?.last_name}` || data?.username}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{data?.email}</p>
              </div>

              <div
                onClick={() => setShowProfile(true)}
                className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserIcon size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                Settings
              </div>
              {/* <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Settings size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                Settings
              </a> */}
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <HelpCircle size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                Help & Support
              </a>

              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <div
                onClick={handleLogout}
                className="cursor-pointer flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogOut size={16} className="mr-3" />
                Sign out
              </div>
            </div>
          )}
          {
            showProfile && <ProfileContrainer profile_data={data} onClose={() => setShowProfile(false)}/>
          }
        </div>
      </div>
    </nav>
  )
}

export default NavBar
