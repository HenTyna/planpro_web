// Sidebar.tsx
import { Path } from '@/utils/enum';
import {
    AlertCircle,
    ChevronRight,
    HelpCircle,
    ListTodo,
    Mail,
    MessageCircle,
    Notebook,
    Plane,
    Star,
    Wallet
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

// Sidebar item component
const SidebarItem = ({
    icon,
    text,
    active = false,
    collapsed = false,
    notification = null
}: {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    collapsed?: boolean;
    notification?: number | null;
}) => {
    return (
        <div
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${active
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } ${collapsed ? 'justify-center' : 'justify-start'}`}
        >
            <div className={`${active ? 'text-purple-600' : 'text-gray-500'}`}>
                {icon}
            </div>

            {!collapsed && (
                <span className="ml-3 flex-1">{text}</span>
            )}

            {!collapsed && notification && (
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
                    {notification}
                </span>
            )}

            {collapsed && notification && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-purple-600 rounded-full"></span>
            )}
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    return (
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 h-screen ${isOpen ? 'w-64' : 'w-20'} flex flex-col fixed left-0 top-0 z-10`}>
            {/* Sidebar header */}
            <div className={`h-16 flex items-center px-4 border-b border-gray-200 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                {isOpen && (
                    <>
                        <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center mr-2">
                            <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M4 8h16M4 16h8" />
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-gray-800">Smarter PMS</span>
                    </>
                )}
                {!isOpen && (
                    <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="M4 8h16M4 16h8" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-1 px-3">
                    {/* Menu items */}
                    <Link href={Path.TRIP}>
                        <SidebarItem icon={<Wallet size={20} />} text="Trips" active={true} collapsed={!isOpen} />
                    </Link>
                    <Link href={Path.PLAN}>
                        <SidebarItem icon={<Plane size={20} />} text="Planning" collapsed={!isOpen} />
                    </Link>
                    <Link href={Path.NOTES}>
                        <SidebarItem icon={<Notebook size={20} />} text="Notes" collapsed={!isOpen} />
                    </Link>
                    <Link href={Path.REMINDER}>
                        <SidebarItem icon={<AlertCircle size={20} />} text="Reminder" collapsed={!isOpen} />
                    </Link>
                    <Link href={Path.TODO}>
                        <SidebarItem icon={<ListTodo size={20} />} text="Todos" collapsed={!isOpen} />
                    </Link>
                    <Link href={Path.CHAT}>
                        <SidebarItem icon={<MessageCircle size={20} />} text="Chat" collapsed={!isOpen} />
                    </Link>

                    {isOpen && <div className="mt-6 mb-3 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Favorites</div>}
                    {!isOpen && <div className="mt-6 mb-3 border-t border-gray-200"></div>}

                    <SidebarItem icon={<Star size={20} />} text="Starred Items" collapsed={!isOpen} />
                    <SidebarItem icon={<HelpCircle size={20} />} text="Help Center" collapsed={!isOpen} />
                </div>
            </div>

            {/* Sidebar footer */}
            <div className="p-4 border-t border-gray-200">
                {isOpen ? (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
                    >
                        <span>Collapse Sidebar</span>
                        <ChevronRight size={16} />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center justify-center w-full p-2 text-gray-700 rounded-md hover:bg-gray-100"
                    >
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;