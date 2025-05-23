"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import {
  Calendar,
  Clock,
  CreditCard,
  Globe,
  Luggage,
  MapPin,
  Plane,
  PlaneLanding,
  Plus,
  Search,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react"
import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import tripImg from "@/public/asset/trip-img2.png"
// Sample trip data
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

const sampleTrips = [
  {
    id: 1,
    title: "Japan Adventure",
    description: "Exploring Tokyo, Kyoto, and Osaka for cultural immersion and food experiences.",
    categoryId: 2,
    statusId: 3,
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 5, 30),
    budget: 5000,
    currency: "USD",
    createdAt: new Date(2025, 2, 10),
    updatedAt: new Date(2025, 3, 5),
    destinations: [
      { id: 1, name: "Tokyo", days: 7, activities: ["Shibuya Crossing", "Tokyo Tower", "Tsukiji Market"] },
      { id: 2, name: "Kyoto", days: 5, activities: ["Fushimi Inari Shrine", "Arashiyama Bamboo Grove", "Kinkaku-ji"] },
      { id: 3, name: "Osaka", days: 3, activities: ["Osaka Castle", "Dotonbori", "Universal Studios Japan"] },
    ],
    travelers: ["John Doe", "Jane Smith"],
    accommodation: "Mix of hotels and traditional ryokans",
    transportation: "Japan Rail Pass, local subway",
    notes: "Need to book ryokan in Kyoto at least 3 months in advance. Research vegetarian restaurant options.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "European Business Conference",
    description: "Attending the annual tech conference in Berlin with team meetings in Paris.",
    categoryId: 1,
    statusId: 2,
    startDate: new Date(2025, 8, 10),
    endDate: new Date(2025, 8, 20),
    budget: 3500,
    currency: "EUR",
    createdAt: new Date(2025, 3, 15),
    updatedAt: new Date(2025, 4, 1),
    destinations: [
      { id: 1, name: "Berlin", days: 5, activities: ["Tech Conference", "Client Meetings", "Networking Event"] },
      { id: 2, name: "Paris", days: 5, activities: ["Team Workshop", "Strategy Planning", "Client Dinner"] },
    ],
    travelers: ["Alex Johnson", "Sarah Williams", "Michael Brown"],
    accommodation: "Hilton Hotels (corporate rate)",
    transportation: "Business class flights, taxi",
    notes: "Expense reports due within 2 weeks of return. Schedule team dinner in Paris.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Weekend Getaway to Mountains",
    description: "Relaxing mountain retreat with hiking, spa, and nature photography.",
    categoryId: 3,
    statusId: 5,
    startDate: new Date(2025, 3, 5),
    endDate: new Date(2025, 3, 7),
    budget: 800,
    currency: "USD",
    createdAt: new Date(2025, 2, 1),
    updatedAt: new Date(2025, 2, 15),
    destinations: [{ id: 1, name: "Blue Ridge Mountains", days: 3, activities: ["Hiking", "Photography", "Spa Day"] }],
    travelers: ["Jane Smith", "Robert Johnson"],
    accommodation: "Mountain View Lodge",
    transportation: "Rental car",
    notes: "Pack hiking boots and camera equipment. Check weather forecast before departure.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Family Summer Vacation",
    description: "Annual family beach vacation with water activities and relaxation.",
    categoryId: 4,
    statusId: 1,
    startDate: new Date(2025, 6, 20),
    endDate: new Date(2025, 7, 5),
    budget: 4500,
    currency: "USD",
    createdAt: new Date(2025, 1, 10),
    updatedAt: new Date(2025, 3, 20),
    destinations: [
      { id: 1, name: "Maui, Hawaii", days: 16, activities: ["Beach Days", "Snorkeling", "Luau", "Volcano Tour"] },
    ],
    travelers: ["John Doe", "Mary Doe", "Emma Doe", "Jack Doe"],
    accommodation: "Beachfront villa rental",
    transportation: "Economy flights, rental minivan",
    notes: "Book luau and volcano tour in advance. Research family-friendly restaurants.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "South America Adventure",
    description: "Exploring Peru and Bolivia with hiking, cultural experiences, and photography.",
    categoryId: 5,
    statusId: 1,
    startDate: new Date(2025, 9, 1),
    endDate: new Date(2025, 9, 21),
    budget: 6000,
    currency: "USD",
    createdAt: new Date(2025, 3, 5),
    updatedAt: new Date(2025, 4, 10),
    destinations: [
      { id: 1, name: "Lima, Peru", days: 3, activities: ["City Tour", "Food Exploration", "Museums"] },
      { id: 2, name: "Cusco & Machu Picchu", days: 7, activities: ["Inca Trail", "Machu Picchu", "Sacred Valley"] },
      { id: 3, name: "La Paz, Bolivia", days: 4, activities: ["City Exploration", "Death Road Biking", "Markets"] },
      { id: 4, name: "Uyuni Salt Flats", days: 3, activities: ["Salt Flats Tour", "Photography", "Stargazing"] },
    ],
    travelers: ["Michael Brown", "Jessica Lee"],
    accommodation: "Mix of hotels and hostels",
    transportation: "Local flights, buses, guided tours",
    notes: "Book Inca Trail permits 6 months in advance. Altitude medication needed. Spanish phrasebook.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

// Helper functions
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

const getDaysBetween = (startDate: Date, endDate: Date) => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getDaysUntilTrip = (startDate: Date) => {
  const today = new Date()
  const diffTime = startDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(amount)
}

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
          className={`p-6 text-white relative ${
            category ? category.color : "bg-blue-500"
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
                  className={`px-2 py-0.5 text-xs font-medium rounded-full bg-white/20 ${
                    status?.name === "Cancelled" ? "text-red-100" : "text-white"
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
                  className={`text-sm font-medium ${
                    daysUntilTrip < 0
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
                      className={`absolute top-0 left-0 w-1 h-full ${
                        index % 2 === 0 ? "bg-blue-400" : "bg-purple-400"
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

// Trip Card Component
const TripCard = ({ trip, onTripClick }: any) => {
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
            className={`text-xs font-medium ${
              daysUntilTrip < 0
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
          <div className="text-sm font-semibold text-gray-800">{formatCurrency(trip.budget, trip.currency)}</div>
        </div>

        {/* Destinations Preview */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1 flex-wrap">
            {trip.destinations.map((destination: any, index: number) => (
              <div
                key={destination.id}
                className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs text-gray-700"
              >
                <MapPin className="h-3 w-3 mr-0.5 text-gray-500" />
                {destination.name}
                {index < trip.destinations.length - 1 && <span className="sr-only">, </span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const [notes, setNotes] = useState(trip?.notes || "")
  const [travelers, setTravelers] = useState(trip?.travelers?.join(", ") || "")

  // Destinations state with a default empty destination if creating a new trip
  const [destinations, setDestinations] = useState(
    trip?.destinations || [{ id: Date.now(), name: "", days: 1, activities: [""] }],
  )

  const handleAddDestination = () => {
    setDestinations([
      ...destinations,
      {
        id: Date.now(),
        name: "",
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
      id: trip?.id || Date.now(),
      title,
      description,
      categoryId: Number(categoryId),
      statusId: Number(statusId),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      budget: Number(budget),
      currency,
      accommodation,
      transportation,
      notes,
      travelers: travelers ? travelers.split(",").map((t: string) => t.trim()) : [],
      destinations,
      createdAt: trip?.createdAt || new Date(),
      updatedAt: new Date(),
      image: trip?.image || "/placeholder.svg?height=400&width=600",
    }

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
          className={`p-4 text-white ${
            isNew ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-500 to-teal-500"
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
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
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

// Main Trip Component
const TripPage = () => {
  const [trips, setTrips] = useState(sampleTrips)
  const [selectedTrip, setSelectedTrip] = useState<any>(null)
  const [showTripModal, setShowTripModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTripClick = (trip: any) => {
    setSelectedTrip(trip)
    setShowDetailsModal(true)
  }

  const handleAddTrip = () => {
    setSelectedTrip(null)
    setShowTripModal(true)
  }

  const handleEditTrip = (trip: any) => {
    setSelectedTrip(trip)
    setShowDetailsModal(false)
    setShowTripModal(true)
  }

  const handleSaveTrip = (trip: any) => {
    if (trip.id && trips.some((t) => t.id === trip.id)) {
      // Update existing trip
      setTrips(trips.map((t) => (t.id === trip.id ? trip : t)))
    } else {
      // Add new trip
      setTrips([trip, ...trips])
    }
  }

  const handleDeleteTrip = (tripId: number) => {
    setTrips(trips.filter((t) => t.id !== tripId))
  }

  // Filter trips
  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.destinations.some((d: any) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = filterCategory === "all" || trip.categoryId === Number(filterCategory)
    const matchesStatus = filterStatus === "all" || trip.statusId === Number(filterStatus)

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Statistics
  const totalTrips = trips.length
  const upcomingTrips = trips.filter((t) => getDaysUntilTrip(t.startDate) > 0).length
  const completedTrips = trips.filter((t) => t.statusId === 5).length
  const totalDestinations = trips.reduce((sum, t) => sum + t.destinations.length, 0)

  if (!mounted) return null

  return (
    <div className="bg-gray-50 custom-scrollbar">
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
                Trip Planner
              </h1>
              <div className="text-gray-600 text-sm mb-4">Dashboard • Trips</div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-500 font-semibold">{totalTrips}</span>
                  </div>
                  <span className="text-gray-700">Total Trips</span>
                </div>
                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <span className="text-yellow-500 font-semibold">{upcomingTrips}</span>
                  </div>
                  <span className="text-gray-700">Upcoming</span>
                </div>
                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-500 font-semibold">{completedTrips}</span>
                  </div>
                  <span className="text-gray-700">Completed</span>
                </div>
                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <span className="text-purple-500 font-semibold">{totalDestinations}</span>
                  </div>
                  <span className="text-gray-700">Destinations</span>
                </div>
              </div>
            </div>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <Image src={tripImg} alt="Travel illustration" width={120} height={120} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-400 w-5 h-5 rounded-md mr-2"></span>
              My Trips
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search trips..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="all">All Categories</option>
                {tripCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="all">All Statuses</option>
                {tripStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              <Button onClick={handleAddTrip} className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                <span className="relative z-10 flex items-center justify-center text-white">
                  <Plus size={16} className="mr-1" />
                  New Trip
                </span>
              </Button>
            </div>
          </div>

          <div className="p-6">
            {filteredTrips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} onTripClick={handleTripClick} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No trips found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || filterCategory !== "all" || filterStatus !== "all"
                    ? "No trips match your current filters"
                    : "You haven't created any trips yet"}
                </p>
                <Button onClick={handleAddTrip} className="relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center text-white">
                    <Plus size={16} className="mr-1" />
                    Plan your first trip
                  </span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trip Details Modal */}
      {showDetailsModal && selectedTrip && (
        <TripDetailsModal
          trip={selectedTrip}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedTrip(null)
          }}
          onEdit={handleEditTrip}
          onDelete={handleDeleteTrip}
        />
      )}

      {/* Add/Edit Trip Modal */}
      {showTripModal && (
        <TripModal
          trip={selectedTrip}
          onClose={() => {
            setShowTripModal(false)
            setSelectedTrip(null)
          }}
          onSave={handleSaveTrip}
          isNew={!selectedTrip}
        />
      )}
    </div>
  )
}

export default TripPage
