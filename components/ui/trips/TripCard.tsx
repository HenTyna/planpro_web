import { formatDate, getDaysBetween, getDaysUntilTrip } from "@/utils/dateformat"
import { formatCurrency } from "@/utils/utils"
import { Calendar, Clock, Globe, MapPin, Plane, Users, Wallet } from "lucide-react"
import Image from "next/image"

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

// Trip Card Component
const TripCard = ({ trip, onTripClick }: any) => {
    console.log("Trip: ", trip)
    const category = tripCategories.find((c) => c.id === trip.categoryId)
    const status = tripStatuses.find((s) => s.id === trip.statusId)
    const tripDuration = getDaysBetween(trip.startDate, trip.endDate)
    const daysUntilTrip = getDaysUntilTrip(trip.startDate)

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden"
            onClick={() => onTripClick(trip)}
        >
            {/* Trip Image */}
            <div className="relative h-40 overflow-hidden">
                <Image
                    src={trip.image || "/placeholder.svg?height=400&width=600"}
                    alt={trip.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {category && <category.icon className="h-4 w-4 text-white" />}
                            <span className="text-xs font-medium text-white">{category?.name}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status?.color} text-white`}>
                            {status?.name}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-100 transition-colors">
                        {trip.title}
                    </h3>
                </div>
            </div>

            {/* Trip Details */}
            <div className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{trip.description}</p>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 text-xs">
                        <Calendar size={12} className="mr-1" />
                        <span>
                            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-500 text-xs">
                        <Clock size={12} className="mr-1" />
                        <span>{tripDuration} days</span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div
                        className={`text-xs font-medium ${daysUntilTrip < 0
                            ? "text-gray-500"
                            : daysUntilTrip === 0
                                ? "text-green-600"
                                : daysUntilTrip <= 7
                                    ? "text-orange-600"
                                    : "text-blue-600"
                            }`}
                    >
                        {daysUntilTrip < 0
                            ? "Trip completed"
                            : daysUntilTrip === 0
                                ? "Departing today!"
                                : `${daysUntilTrip} days until departure`}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">{trip.budget} {trip.currency}</div>
                </div>

                {/* Destinations Preview */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 flex-wrap">
                        {trip.location ? (
                            <div className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                <MapPin className="h-3 w-3 mr-0.5 text-gray-500" />
                                {trip.location || 'Unknown Location'}
                            </div>
                        ) : (
                            <div className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700">
                                <MapPin className="h-3 w-3 mr-0.5 text-gray-500" />
                                <div className="text-xs text-gray-500">No location added</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TripCard