import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import { MapPin, Users, Trash2 } from "lucide-react"
import { useState } from "react"

// Sample event data
const eventCategories = [
    { id: 1, name: "Meeting", color: "bg-blue-400" },
    { id: 2, name: "Personal", color: "bg-green-400" },
    { id: 3, name: "Deadline", color: "bg-red-400" },
    { id: 4, name: "Travel", color: "bg-yellow-400" },
    { id: 5, name: "Social", color: "bg-purple-400" },
]

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

export default EventModal;
