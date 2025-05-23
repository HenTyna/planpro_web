"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import {
    Calendar,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Clock,
    MapPin,
    Plus,
    Tag,
    Trash2,
    Users,
    X,
} from "lucide-react"
import { Input } from "@/components/shared/ui/Input"
import { Button } from "@/components/shared/ui/Button"
import CalendarPic from "@/public/asset/Canlendar1.png"


// Sample event data
const eventCategories = [
    { id: 1, name: "Meeting", color: "bg-blue-400" },
    { id: 2, name: "Personal", color: "bg-green-400" },
    { id: 3, name: "Deadline", color: "bg-red-400" },
    { id: 4, name: "Travel", color: "bg-yellow-400" },
    { id: 5, name: "Social", color: "bg-purple-400" },
]

const sampleEvents = [
    {
        id: 1,
        title: "Team Meeting",
        description: "Weekly team sync to discuss project progress",
        start: new Date(2025, 4, 15, 10, 0),
        end: new Date(2025, 4, 15, 11, 30),
        categoryId: 1,
        location: "Conference Room A",
        attendees: ["John Doe", "Jane Smith", "Alex Johnson"],
    },
    {
        id: 2,
        title: "Project Deadline",
        description: "Final submission for Q2 project",
        start: new Date(2025, 4, 20, 9, 0),
        end: new Date(2025, 4, 20, 18, 0),
        categoryId: 3,
        location: "",
        attendees: [],
    },
    {
        id: 3,
        title: "Lunch with Sarah",
        description: "Catch up over lunch",
        start: new Date(2025, 4, 17, 12, 30),
        end: new Date(2025, 4, 17, 13, 30),
        categoryId: 5,
        location: "Cafe Bistro",
        attendees: ["Sarah Williams"],
    },
    {
        id: 4,
        title: "Dentist Appointment",
        description: "Regular checkup",
        start: new Date(2025, 4, 22, 14, 0),
        end: new Date(2025, 4, 22, 15, 0),
        categoryId: 2,
        location: "Dental Clinic",
        attendees: [],
    },
    {
        id: 5,
        title: "Flight to New York",
        description: "Business trip for client meeting",
        start: new Date(2025, 4, 25, 8, 0),
        end: new Date(2025, 4, 25, 11, 0),
        categoryId: 4,
        location: "Airport Terminal B",
        attendees: [],
    },
    {
        id: 6,
        title: "Client Presentation",
        description: "Presenting new product features",
        start: new Date(2025, 4, 26, 13, 0),
        end: new Date(2025, 4, 26, 15, 0),
        categoryId: 1,
        location: "Client Office",
        attendees: ["Client Team", "Marketing Team"],
    },
]

// Helper functions
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
}

const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

// Event Modal Component
const EventModal = ({ event, onClose, onSave, onDelete, isNew = false }: any) => {
    const [title, setTitle] = useState(event?.title || "")
    const [description, setDescription] = useState(event?.description || "")
    const [startDate, setStartDate] = useState(event?.start ? event.start.toISOString().slice(0, 10) : "")
    const [startTime, setStartTime] = useState(event?.start ? event.start.toTimeString().slice(0, 5) : "")
    const [endDate, setEndDate] = useState(event?.end ? event.end.toISOString().slice(0, 10) : "")
    const [endTime, setEndTime] = useState(event?.end ? event.end.toTimeString().slice(0, 5) : "")
    const [categoryId, setCategoryId] = useState(event?.categoryId || 1)
    const [location, setLocation] = useState(event?.location || "")
    const [attendees, setAttendees] = useState(event?.attendees?.join(", ") || "")

    const handleSave = () => {
        if (!title || !startDate || !startTime || !endDate || !endTime) {
            alert("Please fill in all required fields")
            return
        }

        const start = new Date(`${startDate}T${startTime}`)
        const end = new Date(`${endDate}T${endTime}`)

        if (end < start) {
            alert("End time cannot be before start time")
            return
        }

        const updatedEvent = {
            id: event?.id || Date.now(),
            title,
            description,
            start,
            end,
            categoryId: Number(categoryId),
            location,
            attendees: attendees ? attendees.split(",").map((a: string) => a.trim()) : [],
        }

        onSave(updatedEvent)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
                className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`p-4 text-white ${isNew ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-teal-500"
                        }`}
                >
                    <h2 className="text-xl font-semibold">{isNew ? "Create New Event" : "Edit Event"}</h2>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Event Title*
                            </label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter event title"
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter event description"
                                rows={3}
                                className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date*
                                </label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Time*
                                </label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date*
                                </label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Time*
                                </label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <div className="grid grid-cols-5 gap-2">
                                {eventCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        className={`p-2 rounded-md text-xs font-medium text-center transition-all ${categoryId === category.id
                                                ? `${category.color} text-white ring-2 ring-offset-2 ring-${category.color.split("-")[1]}-500`
                                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                            }`}
                                        onClick={() => setCategoryId(category.id)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter location"
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">
                                Attendees (comma separated)
                            </label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="attendees"
                                    value={attendees}
                                    onChange={(e) => setAttendees(e.target.value)}
                                    placeholder="John Doe, Jane Smith"
                                    className="w-full pl-10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                        <div>
                            {!isNew && (
                                <Button
                                    variant="outline"
                                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this event?")) {
                                            onDelete(event.id)
                                            onClose()
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} className="relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center text-white">
                                    {isNew ? "Create Event" : "Save Changes"}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Event Details Modal Component
const EventDetailsModal = ({ event, onClose, onEdit, onDelete }: any) => {
    if (!event) return null

    const category = eventCategories.find((c) => c.id === event.categoryId)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
                className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`p-4 text-white relative ${category ? category.color : "bg-blue-500"
                        } bg-gradient-to-r from-${category?.color.split("-")[1]}-500 to-${category?.color.split("-")[1]}-400`}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="mb-1 text-white/80 text-sm">{formatDate(event.start)}</div>
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <div className="flex items-center mt-2">
                        <Clock className="h-4 w-4 mr-1 text-white/80" />
                        <span className="text-sm">
                            {formatTime(event.start)} - {formatTime(event.end)}
                        </span>
                    </div>
                </div>

                <div className="p-6">
                    {event.description && (
                        <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                            <p className="text-gray-700">{event.description}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex items-start">
                            <Tag className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                <div
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${category ? category.color : "bg-gray-200"
                                        } text-white`}
                                >
                                    {category ? category.name : "Uncategorized"}
                                </div>
                            </div>
                        </div>

                        {event.location && (
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                                    <p className="text-gray-700">{event.location}</p>
                                </div>
                            </div>
                        )}

                        {event.attendees && event.attendees.length > 0 && (
                            <div className="flex items-start">
                                <Users className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Attendees</h3>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {event.attendees.map((attendee: string, index: number) => (
                                            <span
                                                key={index}
                                                className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
                                            >
                                                {attendee}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this event?")) {
                                    onDelete(event.id)
                                    onClose()
                                }
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                        <Button onClick={() => onEdit(event)} className="relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center text-white">Edit Event</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Day Cell Component
const DayCell = ({ day, month, year, events, onEventClick, onAddEvent }: any) => {
    const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
    const isCurrentMonth = true // For now, we're only showing current month

    // Filter events for this day
    const dayEvents = events.filter((event: any) => {
        const eventDate = new Date(event.start)
        return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
    })

    return (
        <div
            className={`min-h-[100px] p-1 border border-gray-200 ${isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"
                } ${isToday ? "ring-2 ring-blue-200" : ""} relative group`}
        >
            <div className="flex justify-between items-start">
                <span
                    className={`inline-block w-6 h-6 text-center ${isToday ? "bg-blue-500 text-white rounded-full" : isCurrentMonth ? "text-gray-700" : "text-gray-400"
                        }`}
                >
                    {day}
                </span>
                <button
                    onClick={() => onAddEvent(new Date(year, month, day))}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>
            <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto custom-scrollbar">
                {dayEvents.map((event: any) => {
                    const category = eventCategories.find((c) => c.id === event.categoryId)
                    return (
                        <div
                            key={event.id}
                            className={`px-2 py-1 text-xs rounded-md cursor-pointer truncate ${category ? category.color : "bg-gray-200"
                                } text-white hover:opacity-90 transition-opacity`}
                            onClick={() => onEventClick(event)}
                        >
                            {formatTime(event.start)} {event.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Main Calendar Component
const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [events, setEvents] = useState(sampleEvents)
    const [selectedEvent, setSelectedEvent] = useState<any>(null)
    const [showEventModal, setShowEventModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [newEvent, setNewEvent] = useState<any>(null)
    const [view, setView] = useState("month") // month, week, day
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Add CSS for custom scrollbar and animations if not already added
    }, [])

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const handleToday = () => {
        setCurrentDate(new Date())
    }

    const handleAddEvent = (date: Date) => {
        const newEventTemplate = {
            start: date,
            end: new Date(date.getTime() + 60 * 60 * 1000), // 1 hour later
        }
        setNewEvent(newEventTemplate)
        setShowEventModal(true)
    }

    const handleSaveEvent = (event: any) => {
        if (event.id && events.some((e) => e.id === event.id)) {
            // Update existing event
            setEvents(events.map((e) => (e.id === event.id ? event : e)))
        } else {
            // Add new event
            setEvents([...events, event])
        }
    }

    const handleDeleteEvent = (eventId: number) => {
        setEvents(events.filter((e) => e.id !== eventId))
    }

    const handleEventClick = (event: any) => {
        setSelectedEvent(event)
        setShowDetailsModal(true)
    }

    const handleEditEvent = (event: any) => {
        setSelectedEvent(event)
        setShowDetailsModal(false)
        setShowEventModal(true)
    }

    // Calendar grid generation
    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()
        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOfMonth = getFirstDayOfMonth(year, month)
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

        // Create calendar grid
        const calendarDays = []
        const dayCount = 1

        // Add weekday headers
        for (let i = 0; i < 7; i++) {
            calendarDays.push(
                <div
                    key={`header-${i}`}
                    className="p-2 text-center font-medium text-gray-500 bg-gray-50 border border-gray-200"
                >
                    {weekdays[i]}
                </div>,
            )
        }

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="bg-gray-50 border border-gray-200"></div>)
        }

        // Add cells for each day of the month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(
                <DayCell
                    key={`day-${i}`}
                    day={i}
                    month={month}
                    year={year}
                    events={events}
                    onEventClick={handleEventClick}
                    onAddEvent={handleAddEvent}
                />,
            )
        }

        return calendarDays
    }

    if (!mounted) return null

    return (
        <div className="bg-gray-50 overflow-y-auto custom-scrollbar">
            <div className=" mx-auto p-4">
                {/* Header Section */}
                <div className="mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-teal-400 opacity-10 rounded-xl"></div>
                    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 rounded-xl p-6 relative shadow-lg border border-white">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 translate-x-1/3 -translate-y-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full opacity-5 -translate-x-1/3 translate-y-1/3"></div>

                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                Calendar
                            </h1>
                            <div className="text-gray-600 text-sm mb-4">Dashboard • Calendar</div>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                        <span className="text-blue-500 font-semibold">{events.length}</span>
                                    </div>
                                    <span className="text-gray-700">Total Events</span>
                                </div>
                                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                                        <span className="text-purple-500 font-semibold">
                                            {
                                                events.filter(
                                                    (e) =>
                                                        e.start.getMonth() === currentDate.getMonth() &&
                                                        e.start.getFullYear() === currentDate.getFullYear(),
                                                ).length
                                            }
                                        </span>
                                    </div>
                                    <span className="text-gray-700">This Month</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                            <Image src={CalendarPic} alt="Calendar illustration" width={120} height={120} />
                        </div>
                    </div>
                </div>

                {/* Calendar Controls */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                                <span className="bg-gradient-to-r from-blue-500 to-purple-400 w-5 h-5 rounded-md mr-2"></span>
                                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    className={`px-3 py-1 text-sm ${view === "month" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setView("month")}
                                >
                                    Month
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm ${view === "week" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setView("week")}
                                >
                                    Week
                                </button>
                                <button
                                    className={`px-3 py-1 text-sm ${view === "day" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setView("day")}
                                >
                                    Day
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleToday}>
                                    Today
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleNextMonth}>
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button
                                onClick={() =>
                                    handleAddEvent(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()))
                                }
                                className="relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center text-white">
                                    <Plus size={16} className="mr-1" />
                                    Add Event
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="p-4">
                        {view === "month" && <div className="grid grid-cols-7 gap-0">{renderCalendarGrid()}</div>}
                        {view === "week" && (
                            <div className="bg-gray-50 rounded-lg p-8 text-center">
                                <div className="flex flex-col items-center justify-center h-64">
                                    <CalendarDays className="h-16 w-16 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Week View Coming Soon</h3>
                                    <p className="text-gray-500 max-w-md">
                                        We're working on an amazing week view for your calendar. Stay tuned for updates!
                                    </p>
                                </div>
                            </div>
                        )}
                        {view === "day" && (
                            <div className="bg-gray-50 rounded-lg p-8 text-center">
                                <div className="flex flex-col items-center justify-center h-64">
                                    <Calendar className="h-16 w-16 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-700 mb-2">Day View Coming Soon</h3>
                                    <p className="text-gray-500 max-w-md">
                                        We're working on a detailed day view for your calendar. Stay tuned for updates!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Event Categories Legend */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">Event Categories:</span>
                            {eventCategories.map((category) => (
                                <div key={category.id} className="flex items-center">
                                    <div className={`w-3 h-3 rounded-full ${category.color} mr-1`}></div>
                                    <span className="text-xs text-gray-600">{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Modals */}
            {showEventModal && (
                <EventModal
                    event={selectedEvent || newEvent}
                    onClose={() => {
                        setShowEventModal(false)
                        setSelectedEvent(null)
                        setNewEvent(null)
                    }}
                    onSave={handleSaveEvent}
                    onDelete={handleDeleteEvent}
                    isNew={!selectedEvent}
                />
            )}

            {showDetailsModal && selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    onClose={() => {
                        setShowDetailsModal(false)
                        setSelectedEvent(null)
                    }}
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                />
            )}
        </div>
    )
}

export default CalendarPage
