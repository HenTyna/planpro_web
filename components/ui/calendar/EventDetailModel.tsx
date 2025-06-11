import { Button } from "@/components/shared/ui/Button"
import { formatDate, formatTime } from "@/utils/dateformat"
import { MapPin, Users, Trash2, X, Clock, Tag } from "lucide-react"


// Sample event data
const eventCategories = [
    { id: 1, name: "Meeting", color: "bg-blue-400" },
    { id: 2, name: "Personal", color: "bg-green-400" },
    { id: 3, name: "Deadline", color: "bg-red-400" },
    { id: 4, name: "Travel", color: "bg-yellow-400" },
    { id: 5, name: "Social", color: "bg-purple-400" },
]

// Event Details Modal Component
const EventDetailModel = ({ event, onClose, onEdit, onDelete }: any) => {
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

export default EventDetailModel;
