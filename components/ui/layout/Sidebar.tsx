"use client"

import { Path } from "@/utils/enum"
import {
    AlertCircle,
    Calendar,
    Calendar1,
    ChartAreaIcon,
    ChevronLeft,
    ChevronRight,
    HelpCircle,
    ListTodo,
    MessageCircle,
    Notebook,
    Plane,
    Sparkles,
    Star,
    Wallet,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import type React from "react"
import { useState, useEffect } from "react"

interface SidebarProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

// Sidebar item component
const SidebarItem = ({
    icon,
    text,
    active = false,
    collapsed = false,
    notification = null,
    color = "blue",
}: {
    icon: React.ReactNode
    text: string
    active?: boolean
    collapsed?: boolean
    notification?: number | null
    color?: "blue" | "orange" | "yellow" | "green" | "teal" | "purple"
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isActive, setIsActive] = useState(active)

    useEffect(() => {
        setIsActive(active)
    }, [active])

    const colorMap = {
        blue: {
            bg: "bg-blue-50",
            text: "text-blue-600",
            hover: "hover:bg-blue-50/70 hover:text-blue-600",
            icon: "text-blue-500",
            notification: "bg-blue-100 text-blue-600",
            gradient: "from-blue-500 to-blue-400",
        },
        orange: {
            bg: "bg-orange-50",
            text: "text-orange-600",
            hover: "hover:bg-orange-50/70 hover:text-orange-600",
            icon: "text-orange-500",
            notification: "bg-orange-100 text-orange-600",
            gradient: "from-orange-500 to-orange-400",
        },
        yellow: {
            bg: "bg-yellow-50",
            text: "text-yellow-600",
            hover: "hover:bg-yellow-50/70 hover:text-yellow-600",
            icon: "text-yellow-500",
            notification: "bg-yellow-100 text-yellow-600",
            gradient: "from-yellow-500 to-yellow-400",
        },
        green: {
            bg: "bg-green-50",
            text: "text-green-600",
            hover: "hover:bg-green-50/70 hover:text-green-600",
            icon: "text-green-500",
            notification: "bg-green-100 text-green-600",
            gradient: "from-green-500 to-green-400",
        },
        teal: {
            bg: "bg-teal-50",
            text: "text-teal-600",
            hover: "hover:bg-teal-50/70 hover:text-teal-600",
            icon: "text-teal-500",
            notification: "bg-teal-100 text-teal-600",
            gradient: "from-teal-500 to-teal-400",
        },
        purple: {
            bg: "bg-purple-50",
            text: "text-purple-600",
            hover: "hover:bg-purple-50/70 hover:text-purple-600",
            icon: "text-purple-500",
            notification: "bg-purple-100 text-purple-600",
            gradient: "from-purple-500 to-purple-400",
        },
    }

    const colors = colorMap[color]

    return (
        <div
            className={`relative flex items-center px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${isActive ? `${colors.bg} ${colors.text}` : `text-gray-700 ${colors.hover}`
                } ${collapsed ? "justify-center mx-2" : "justify-start mx-1"} ${isHovered && !isActive ? "shadow-sm" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isActive && !collapsed && (
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b rounded-r-md"
                    style={{
                        background: `linear-gradient(to bottom, var(--${color}-500), var(--${color}-400))`,
                    }}
                />
            )}

            <div className={`${isActive ? colors.icon : "text-gray-500"} transition-colors duration-200`}>{icon}</div>

            {!collapsed && (
                <span className={`ml-3 flex-1 transition-all duration-200 ${isActive ? "font-semibold" : ""}`}>{text}</span>
            )}

            {!collapsed && notification && (
                <span className={`${colors.notification} px-2 py-0.5 rounded-full text-xs font-medium`}>{notification}</span>
            )}

            {collapsed && notification && <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full"></span>}

            {collapsed && isHovered && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-white rounded-md shadow-md text-sm whitespace-nowrap z-50">
                    {text}
                </div>
            )}
        </div>
    )
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const router = useRouter()
    const currentPath = router.pathname
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Add CSS variables for colors
        document.documentElement.style.setProperty("--blue-500", "#3b82f6")
        document.documentElement.style.setProperty("--blue-400", "#60a5fa")
        document.documentElement.style.setProperty("--orange-500", "#f97316")
        document.documentElement.style.setProperty("--orange-400", "#fb923c")
        document.documentElement.style.setProperty("--yellow-500", "#eab308")
        document.documentElement.style.setProperty("--yellow-400", "#facc15")
        document.documentElement.style.setProperty("--green-500", "#22c55e")
        document.documentElement.style.setProperty("--green-400", "#4ade80")
        document.documentElement.style.setProperty("--teal-500", "#14b8a6")
        document.documentElement.style.setProperty("--teal-400", "#2dd4bf")
        document.documentElement.style.setProperty("--purple-500", "#a855f7")
        document.documentElement.style.setProperty("--purple-400", "#c084fc")
    }, [])

    if (!mounted) return null

    return (
        <div
            className={`bg-white border-r border-gray-200 transition-all duration-300 h-screen ${isOpen ? "w-64" : "w-20"} flex flex-col fixed left-0 top-0 z-10 shadow-sm`}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-50 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-teal-50 to-transparent opacity-50 pointer-events-none"></div>

            {/* Sidebar header */}
            <div
                className={`h-16 flex items-center px-4 border-b border-gray-200 relative ${isOpen ? "justify-start" : "justify-center"}`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 opacity-50 pointer-events-none"></div>
                {isOpen ? (
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20 animate-pulse"></div>
                            <Sparkles className="h-8 w-8 text-blue-500 relative z-10" />
                        </div>
                        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                            PlanPro
                        </span>
                    </div>
                ) : (
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-sm opacity-20 animate-pulse"></div>
                        <Sparkles className="h-8 w-8 text-blue-500 relative z-10" />
                    </div>
                )}
            </div>

            {/* Sidebar content */}
            <div className="flex-1 overflow-y-auto py-4 px-2">
                <div className="space-y-1.5">
                    {/* Menu items */}
                    <Link href={Path.TRIP}>
                        <SidebarItem
                            icon={<Wallet size={20} />}
                            text="Trips"
                            active={currentPath === Path.TRIP}
                            collapsed={!isOpen}
                            color="blue"
                        />
                    </Link>
                    <Link href={Path.PLAN}>
                        <SidebarItem
                            icon={<Plane size={20} />}
                            text="Planning"
                            active={currentPath === Path.PLAN}
                            collapsed={!isOpen}
                            color="orange"
                        />
                    </Link>
                    <Link href={Path.NOTES}>
                        <SidebarItem
                            icon={<Notebook size={20} />}
                            text="Notes"
                            active={currentPath === Path.NOTES}
                            collapsed={!isOpen}
                            color="yellow"
                        />
                    </Link>
                    <Link href={Path.REMINDER}>
                        <SidebarItem
                            icon={<AlertCircle size={20} />}
                            text="Reminder"
                            active={currentPath === Path.REMINDER}
                            collapsed={!isOpen}
                            color="green"
                        />
                    </Link>
                    <Link href={Path.TODO}>
                        <SidebarItem
                            icon={<ListTodo size={20} />}
                            text="Todos"
                            active={currentPath === Path.TODO}
                            collapsed={!isOpen}
                            notification={3}
                            color="teal"
                        />
                    </Link>
                    <Link href={Path.CALENDAR}>
                        <SidebarItem
                            icon={<Calendar1 size={20} />}
                            text="Canlendar"
                            active={currentPath === Path.CALENDAR}
                            collapsed={!isOpen}
                            notification={3}
                            color="teal"
                        />
                    </Link>
                    <Link href={Path.CHAT}>
                        <SidebarItem
                            icon={<MessageCircle size={20} />}
                            text="Chat AI"
                            active={currentPath === Path.CHAT}
                            collapsed={!isOpen}
                            color="purple"
                        />
                    </Link>

                    <Link href={Path.TELEGRAM}>
                        <SidebarItem
                            icon={<ChartAreaIcon size={20} />}
                            text="Telegram"
                            active={currentPath === Path.TELEGRAM}
                            collapsed={!isOpen}
                            color="purple"
                        />
                    </Link>

                    {isOpen && (
                        <div className="mt-8 mb-3 px-3">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 bg-white text-gray-500 uppercase tracking-wider font-semibold">Favorites</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {!isOpen && <div className="mt-8 mb-3 border-t border-gray-200"></div>}

                    <SidebarItem icon={<Star size={20} />} text="Starred Items" collapsed={!isOpen} color="yellow" />
                    <SidebarItem icon={<HelpCircle size={20} />} text="Help Center" collapsed={!isOpen} color="blue" />
                </div>
            </div>

            {/* Sidebar footer */}
            <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50/30 to-teal-50/30">
                {isOpen ? (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
                    >
                        <span>Collapse Sidebar</span>
                        <ChevronLeft size={16} className="text-gray-500" />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center justify-center w-full p-2 text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
                    >
                        <ChevronRight size={16} className="text-gray-500" />
                    </button>
                )}
            </div>
        </div>
    )
}

export default Sidebar
