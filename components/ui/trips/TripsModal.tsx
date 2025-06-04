import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import { Calendar, Globe, MapPin, Plane, Plus, Trash2, Users, Wallet, X } from "lucide-react"
import { useState } from "react"


const tripCategories = [
    { id: 1, name: "Business", color: "bg-blue-400", icon: Wallet },
    { id: 2, name: "Vacation", color: "bg-green-400", icon: Plane },
    { id: 3, name: "Weekend", color: "bg-orange-400", icon: Calendar },
    { id: 4, name: "Family", color: "bg-purple-400", icon: Users },
    { id: 5, name: "Adventure", color: "bg-red-400", icon: Globe },
    { id: 6, name: "Road Trip", color: "bg-yellow-400", icon: MapPin },
]

const tripStatuses = [
    { id: 1, name: "Planning", color: "bg-blue-400" },
    { id: 2, name: "Booked", color: "bg-purple-400" },
    { id: 3, name: "Upcoming", color: "bg-yellow-400" },
    { id: 4, name: "In Progress", color: "bg-orange-400" },
    { id: 5, name: "Completed", color: "bg-green-400" },
    { id: 6, name: "Cancelled", color: "bg-gray-400" },
]
// Add/Edit Trip Modal Component
const TripModal = ({ trip, onClose, onSave, isNew = false }: any) => {
    const [title, setTitle] = useState(trip?.title || "")
    const [description, setDescription] = useState(trip?.description || "")
    const [categoryId, setCategoryId] = useState(trip?.categoryId || 2)
    const [statusId, setStatusId] = useState(trip?.statusId || 1)
    const [startDate, setStartDate] = useState(trip?.startDate ? trip.startDate.toISOString().slice(0, 10) : "")
    const [endDate, setEndDate] = useState(trip?.endDate ? trip.endDate.toISOString().slice(0, 10) : "")
    const [budget, setBudget] = useState(trip?.budget || 1000)
    const [currency, setCurrency] = useState(trip?.currency || "USD")
    const [accommodation, setAccommodation] = useState(trip?.accommodation || "")
    const [transportation, setTransportation] = useState(trip?.transportation || "")
    const [remarks, setRemark] = useState(trip?.remarks || "")
    const [travelers, setTravelers] = useState(trip?.travelers?.join(", ") || "")
    const [location, setLocation] = useState(trip?.location || "")

    // Destinations state with a default empty destination if creating a new trip
    const [destinations, setDestinations] = useState(
        trip?.destinations || [{ destinationName: "", days: 1, activities: [""] }],
    )

    const handleAddDestination = () => {
        setDestinations([
            ...destinations,
            {
                destinationName: "",
                days: 1,
                activities: [""],
            },
        ])
    }

    const handleRemoveDestination = (id: number) => {
        if (destinations.length > 1) {
            setDestinations(destinations.filter((d: any) => d.id !== id))
        }
    }

    const handleDestinationChange = (id: number, field: string, value: any) => {
        setDestinations(destinations.map((d: any) => (d.id === id ? { ...d, [field]: value } : d)))
    }

    const handleAddActivity = (destinationId: number) => {
        setDestinations(
            destinations.map((d: any) => (d.id === destinationId ? { ...d, activities: [...d.activities, ""] } : d)),
        )
    }

    const handleRemoveActivity = (destinationId: number, activityIndex: number) => {
        setDestinations(
            destinations.map((d: any) => {
                if (d.id === destinationId && d.activities.length > 1) {
                    const newActivities = [...d.activities]
                    newActivities.splice(activityIndex, 1)
                    return { ...d, activities: newActivities }
                }
                return d
            }),
        )
    }

    const handleActivityChange = (destinationId: number, activityIndex: number, value: string) => {
        setDestinations(
            destinations.map((d: any) => {
                if (d.id === destinationId) {
                    const newActivities = [...d.activities]
                    newActivities[activityIndex] = value
                    return { ...d, activities: newActivities }
                }
                return d
            }),
        )
    }

    const handleSave = () => {
        if (!title || !description || !startDate || !endDate) {
            alert("Please fill in all required fields")
            return
        }

        if (new Date(endDate) < new Date(startDate)) {
            alert("End date cannot be before start date")
            return
        }

        // Validate destinations
        for (const destination of destinations) {
            if (!destination.name) {
                alert("Please provide a name for all destinations")
                return
            }
            for (const activity of destination.activities) {
                if (!activity) {
                    alert("Please provide a description for all activities")
                    return
                }
            }
        }

        const updatedTrip = {
            title,
            description,
            category: Number(categoryId),
            status: Number(statusId),
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            budget: Number(budget),
            currency,
            accommodation,
            transportation,
            remarks,
            travelers: travelers,
            destinations,
            imageUrl: trip?.imageUrl || "/placeholder.svg?height=400&width=600",
            location
        }
        console.log("updatedTrip", updatedTrip)
        onSave(updatedTrip)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
                className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`p-4 text-white ${isNew ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-teal-500"
                        }`}
                >
                    <h2 className="text-xl font-semibold">{isNew ? "Create New Trip" : "Edit Trip"}</h2>
                </div>

                <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto custom-scrollbar">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Trip Title*
                                </label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter trip title"
                                    required
                                    className="w-full"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description*
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Describe your trip"
                                    rows={3}
                                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(Number(e.target.value))}
                                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                >
                                    {tripCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={statusId}
                                    onChange={(e) => setStatusId(Number(e.target.value))}
                                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                >
                                    {tripStatuses.map((status) => (
                                        <option key={status.id} value={status.id}>
                                            {status.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

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
                                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                                    Budget
                                </label>
                                <Input
                                    id="budget"
                                    type="number"
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    min="0"
                                    step="100"
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                                    Currency
                                </label>
                                <select
                                    id="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                    <option value="AUD">AUD - Australian Dollar</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-1">
                                    Travelers (comma separated)
                                </label>
                                <Input
                                    id="travelers"
                                    value={travelers}
                                    onChange={(e) => setTravelers(e.target.value)}
                                    placeholder="John Doe, Jane Smith"
                                    className="w-full"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                    Location (Link to Google Maps)
                                </label>
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="URL_ADDRESS.gl/maps/..."
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Accommodation
                                </label>
                                <Input
                                    id="accommodation"
                                    value={accommodation}
                                    onChange={(e) => setAccommodation(e.target.value)}
                                    placeholder="Hotels, Airbnb, etc."
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="transportation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Transportation
                                </label>
                                <Input
                                    id="transportation"
                                    value={transportation}
                                    onChange={(e) => setTransportation(e.target.value)}
                                    placeholder="Flights, rental car, etc."
                                    className="w-full"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    value={remarks}
                                    onChange={(e) => setRemark(e.target.value)}
                                    placeholder="Additional notes, reminders, etc."
                                    rows={2}
                                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3"
                                />
                            </div>
                        </div>

                        {/* Destinations Section */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Destinations & Activities</h3>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleAddDestination}
                                    className="text-blue-600 border-blue-200"
                                >
                                    <Plus className="h-4 w-4 mr-1" /> Add Destination
                                </Button>
                            </div>

                            <div className="space-y-6">
                                {destinations.map((destination: any, index: number) => (
                                    <div key={destination.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative">
                                        <div className="absolute top-2 right-2">
                                            {destinations.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveDestination(destination.id)}
                                                    className="text-gray-400 hover:text-red-500 p-1"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                            <div className="md:col-span-3">
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Name*</label>
                                                <Input
                                                    value={destination.name}
                                                    onChange={(e) => handleDestinationChange(destination.id, "name", e.target.value)}
                                                    placeholder="e.g., Paris, Tokyo"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                                                <Input
                                                    type="number"
                                                    value={destination.days}
                                                    onChange={(e) => handleDestinationChange(destination.id, "days", Number(e.target.value))}
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
                                            <div className="space-y-2">
                                                {destination.activities.map((activity: string, actIndex: number) => (
                                                    <div key={actIndex} className="flex items-center gap-2">
                                                        <Input
                                                            value={activity}
                                                            onChange={(e) => handleActivityChange(destination.id, actIndex, e.target.value)}
                                                            placeholder="e.g., Visit Eiffel Tower"
                                                            className="flex-1"
                                                        />
                                                        <div className="flex items-center">
                                                            {destination.activities.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveActivity(destination.id, actIndex)}
                                                                    className="text-gray-400 hover:text-red-500 p-1"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            )}
                                                            <button
                                                                type="button"
                                                                onClick={() => handleAddActivity(destination.id)}
                                                                className="text-gray-400 hover:text-blue-500 p-1"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center text-white">
                                {isNew ? "Create Trip" : "Save Changes"}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TripModal