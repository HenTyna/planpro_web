import { Button } from "@/components/shared/ui/Button"
import { getDaysBetween, getDaysUntilTrip } from "@/utils/dateformat"
import { formatCurrency, formatDate } from "@/utils/utils"
import { Calendar, Clock, CreditCard, Globe, Luggage, MapPin, Plane, PlaneLanding, Trash2, UserRound, Users, Wallet, X } from "lucide-react"
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
// Trip Details Modal Component
const TripDetailsModal = ({ trip, onClose, onEdit, onDelete }: any) => {
    if (!trip) return null

    const category = tripCategories.find((c) => c.id === trip.categoryId)
    const status = tripStatuses.find((s) => s.id === trip.statusId)
    const tripDuration = getDaysBetween(trip.startDate, trip.endDate)
    const daysUntilTrip = getDaysUntilTrip(trip.startDate)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
                className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`p-6 text-white relative ${category ? category.color : "bg-blue-500"
                        } bg-gradient-to-r from-${category?.color.split("-")[1]}-500 to-${category?.color.split("-")[1]}-400`}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-2 top-2 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {category && <category.icon className="h-5 w-5 text-white/90" />}
                                <span className="text-sm font-medium text-white/90">{category?.name}</span>
                                <span
                                    className={`px-2 py-0.5 text-xs font-medium rounded-full bg-white/20 ${status?.name === "Cancelled" ? "text-red-100" : "text-white"
                                        }`}
                                >
                                    {status?.name}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{trip.title}</h2>
                            <div className="flex items-center gap-4 text-white/90">
                                <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    <span className="text-sm">
                                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span className="text-sm">{tripDuration} days</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xl font-bold">{formatCurrency(trip.budget, trip.currency)}</div>
                            <div className="text-sm text-white/80">Budget</div>
                        </div>
                    </div>
                    {trip.image && (
                        <div className="mt-4 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={trip.image || "/placeholder.svg"}
                                alt={trip.title}
                                width={800}
                                height={400}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-350px)] custom-scrollbar">
                    <div className="space-y-6">
                        {/* Description */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{trip.description}</p>
                        </div>

                        {/* Trip Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 mb-2">Trip Status</h4>
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${status?.color} text-white`}>
                                    {status?.name}
                                </span>
                                <span
                                    className={`text-sm font-medium ${daysUntilTrip < 0
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
                                </span>
                            </div>
                        </div>

                        {/* Destinations */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Itinerary</h3>
                            <div className="space-y-4">
                                {trip.destinations.map((destination: any, index: number) => (
                                    <div
                                        key={destination.id}
                                        className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative overflow-hidden"
                                    >
                                        <div
                                            className={`absolute top-0 left-0 w-1 h-full ${index % 2 === 0 ? "bg-blue-400" : "bg-purple-400"
                                                }`}
                                        ></div>
                                        <div className="pl-3">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-semibold text-gray-800">{destination.name}</h4>
                                                <span className="text-sm text-gray-500">{destination.days} days</span>
                                            </div>
                                            <div className="space-y-2">
                                                <h5 className="text-xs font-medium text-gray-500 uppercase tracking-wider">Activities</h5>
                                                <ul className="space-y-1">
                                                    {destination.activities.map((activity: string, actIndex: number) => (
                                                        <li key={actIndex} className="text-sm text-gray-600 flex items-start">
                                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 mr-2"></span>
                                                            {activity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trip Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Travelers</h4>
                                <div className="flex flex-wrap gap-2">
                                    {trip.travelers.map((traveler: string, index: number) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-white rounded-full px-3 py-1 border border-gray-200"
                                        >
                                            <Users className="h-3 w-3 mr-1 text-gray-500" />
                                            <span className="text-xs font-medium text-gray-700">{traveler}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Budget</h4>
                                <div className="flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                                    <span className="text-lg font-semibold text-gray-800">
                                        {formatCurrency(trip.budget, trip.currency)}
                                    </span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Accommodation</h4>
                                <div className="flex items-start">
                                    <Luggage className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                    <span className="text-sm text-gray-700">{trip.accommodation}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Transportation</h4>
                                <div className="flex items-start">
                                    <PlaneLanding className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                                    <span className="text-sm text-gray-700">{trip.transportation}</span>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {trip.notes && (
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <h4 className="text-sm font-medium text-yellow-800 mb-2">Notes</h4>
                                <p className="text-sm text-yellow-700">{trip.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-between">
                        <Button
                            variant="outline"
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this trip?")) {
                                    onDelete(trip.id)
                                    onClose()
                                }
                            }}
                        >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete Trip
                        </Button>
                        <Button onClick={() => onEdit(trip)} className="relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center text-white">Edit Trip</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TripDetailsModal