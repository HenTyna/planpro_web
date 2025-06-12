import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Trash2, Users } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { OnConfirmationDelete } from "../../shared/OnConfirmationDelete"
import { CalendarEvent } from "./CalendarPage"

// API-matching event categories and enum mapping
const eventCategories = [
    { id: "1", name: "Meeting", color: "bg-blue-400", apiType: "meeting" },
    { id: "2", name: "Vacation", color: "bg-green-400", apiType: "vacation" },
    { id: "3", name: "Weekend", color: "bg-gray-400", apiType: "weekend" },
    { id: "4", name: "Personal", color: "bg-yellow-400", apiType: "personal" },
    { id: "5", name: "Deadline", color: "bg-red-400", apiType: "deadline" },
    { id: "6", name: "Travel", color: "bg-purple-400", apiType: "travel" },
]

// Zod schema matching API fields
const eventFormSchema = z.object({
    eventTitle: z.string().min(1, "Event title is required"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    location: z.string().optional(),
    calendarType: z.string().min(1, "Category is required"), // enum string: "1", "2", etc.
    attendees: z.string().optional(),
})

type EventFormData = z.infer<typeof eventFormSchema>

interface EventModalProps {
    event: CalendarEvent | null;
    onClose: () => void;
    onSave: (event: any) => void; // Accepts API shape
    onDelete: (eventId: number) => void;
    isNew?: boolean;
}

// Helper to map old event/category to API enum id
function getApiCategoryId(event: CalendarEvent | null): string {
    if (!event) return "1"
    // Try to match by id or name
    const found = eventCategories.find(
        (cat) =>
            cat.id === String(event.categoryId) ||
            cat.name.toLowerCase() === (event as any).calendarType?.toLowerCase() ||
            cat.name.toLowerCase() === (event as any).category?.toLowerCase()
    )
    return found ? found.id : "1"
}

// Event Modal Component
const EventModal = ({ event, onClose, onSave, onDelete, isNew = false }: EventModalProps) => {
    if (!event) return null;
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)
    // useForm setup
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EventFormData>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            eventTitle: event?.title || "",
            description: event?.description || "",
            startDate: event?.start ? event.start.toISOString().slice(0, 10) : "",
            endDate: event?.end ? event.end.toISOString().slice(0, 10) : "",
            startTime: event?.start ? event.start.toTimeString().slice(0, 5) : "",
            endTime: event?.end ? event.end.toTimeString().slice(0, 5) : "",
            location: event?.location || "",
            calendarType: getApiCategoryId(event),
            attendees: event?.attendees?.join(", ") || "",
        },
    })

    // Save handler: match API request shape
    const onSubmit = (data: EventFormData) => {
        // No need to combine date/time, just send as string fields
        // But for local validation, check if end is after start
        const start = new Date(`${data.startDate}T${data.startTime}`)
        const end = new Date(`${data.endDate}T${data.endTime}`)

        if (end < start) {
            alert("End time cannot be before start time")
            return
        }

        // API expects: eventTitle, description, startDate, endDate, startTime, endTime, location, calendarType, attendees
        const apiEvent = {
            id: event?.id || 0,
            eventTitle: data.eventTitle,
            description: data.description || "",
            startDate: data.startDate,
            endDate: data.endDate,
            startTime: data.startTime,
            endTime: data.endTime,
            location: data.location || "",
            calendarType: data.calendarType, // "1", "2", etc.
            attendees: data.attendees || "",
        }

        onSave(apiEvent)
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

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                Event Title*
                            </label>
                            <Input
                                id="eventTitle"
                                {...register("eventTitle")}
                                placeholder="Enter event title"
                                className="w-full"
                            />
                            {errors.eventTitle && <p className="text-sm text-red-600">{errors.eventTitle.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                id="description"
                                {...register("description")}
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
                                    {...register("startDate")}
                                    className="w-full"
                                />
                                {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Time*
                                </label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    {...register("startTime")}
                                    className="w-full"
                                />
                                {errors.startTime && <p className="text-sm text-red-600">{errors.startTime.message}</p>}
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
                                    {...register("endDate")}
                                    className="w-full"
                                />
                                {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                                    End Time*
                                </label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    {...register("endTime")}
                                    className="w-full"
                                />
                                {errors.endTime && <p className="text-sm text-red-600">{errors.endTime.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="calendarType" className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {eventCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        className={`p-2 rounded-md text-xs font-medium text-center transition-all ${watch("calendarType") === category.id
                                                ? `${category.color} text-white ring-2 ring-offset-2 ring-${category.color.split("-")[1]}-500`
                                                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                            }`}
                                        onClick={() => setValue("calendarType", category.id)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                            {errors.calendarType && <p className="text-sm text-red-600">{errors.calendarType.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    id="location"
                                    {...register("location")}
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
                                    {...register("attendees")}
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
                                        setShowConfirmDelete(true)
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
                            <Button type="submit" className="relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                                <span className="relative z-10 flex items-center justify-center text-white">
                                    {isNew ? "Create Event" : "Save Changes"}
                                </span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            {
                showConfirmDelete && (
                    <OnConfirmationDelete
                        onClose={() => setShowConfirmDelete(false)}
                        onConfirm={() => {
                            onDelete(event?.id || 0)
                            onClose()
                        }}
                        title={event?.title || ""}
                        show={showConfirmDelete}
                        description={`Are you sure you want to delete this event? This action cannot be undone.`}
                    />
                )
            }
        </div>
    )
}

export default EventModal;
