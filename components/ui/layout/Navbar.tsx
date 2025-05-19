// NavBar.tsx
import React, { useState } from 'react';
import {
    Menu,
    Search,
    Settings,
    Moon,
    Bell,
    ChevronDown
} from 'lucide-react';
import profile from '@/public/asset/profile.jpg';
import Image from 'next/image';
interface NavBarProps {
    toggleSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSidebar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between overflow-hidden">
            {/* Left section - Menu and search */}
            <div className="flex items-center">
                {/* Menu button */}
                <button
                    className="p-2 rounded-full hover:bg-gray-100 mr-2"
                    onClick={toggleSidebar}
                >
                    <Menu size={20} className="text-gray-600" />
                </button>

                {/* Search */}
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                    />
                </div>
            </div>

            {/* Right section - Control icons */}
            <div className="flex items-center space-x-2">
                

                {/* Dark mode toggle */}
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <Moon size={20} className="text-gray-600" />
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Language selector */}
                <button className="p-2 rounded-full hover:bg-gray-100 mr-1">
                    <div className="h-5 w-5 rounded-full overflow-hidden flex items-center justify-center">
                        <span className="text-xs font-bold">🇬🇧</span>
                    </div>
                </button>

                {/* User profile */}
                <div className="relative">
                    <button
                        className="flex items-center p-1 rounded-full hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="h-8 w-8 bg-indigo-100 rounded-full overflow-hidden flex items-center justify-center border border-gray-200">
                            <Image src={profile} alt="User avatar" width={48}
                            height={48} className="h-full w-full object-cover" />
                        </div>
                        <ChevronDown size={16} className="text-gray-400 ml-1" />
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-10">
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;