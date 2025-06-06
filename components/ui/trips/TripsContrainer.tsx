
import { useState, useEffect, useMemo } from "react"
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
import useFetchTrips from "@/lib/hooks/useFetchTrips"
import TripCard from "./TripCard"
import TripDetailsModal from "./TripsDetailModal"
import TripModal from "./TripsModal"
import { getDaysUntilTrip } from "@/utils/dateformat"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { tripsService } from "@/service/trips.service"
import toast from "react-hot-toast"
import { ConfirmationDialog } from "../notes/NotesList"
import { ConfirmationType } from "@/utils/enum"
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
// Main Trip Component
const TripPage = () => {
  const { data, isLoading } = useFetchTrips()
  const queryClient = useQueryClient();
  const [trips, setTrips] = useState(data || [])
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
  //mutation create trip
  const createMutation = useMutation({
    mutationFn: async (trip: any) => {
      return await tripsService.createTrip(trip);
    },
    onSuccess: (newTrip) => {
      setTrips((prev: any[]) => [...prev, newTrip.data]);
      setShowTripModal(false);
      toast.success("Trip created successfully");
      queryClient.invalidateQueries({ queryKey: ['trips-data'] });
    },
    onError: (error) => {
      toast.error("Failed to create trip");
      setShowTripModal(true);
      console.error('Error creating trip:', error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (data: { id: number; request: any }) => {
      return await tripsService.updateTrip(data.id, data.request);
    },
    onSuccess: (updatedTrip) => {
      setTrips((prev: any[]) => prev.map(t => t.id === updatedTrip.data.id ? updatedTrip.data : t));
      setShowTripModal(false);
      toast.success("Trip updated successfully");
      queryClient.invalidateQueries({ queryKey: ['trips-data'] });
    },
    onError: (error) => {
      toast.error("Failed to update trip");
      setShowTripModal(true);
      console.error('Error updating trip:', error);
    }
  });

  //mutation delete trip
  const deleteMutation = useMutation({
    mutationFn: async (id: any) => {
      return await tripsService.deleteTrip(id);
    },
    onSuccess: () => {
      toast.success("Trip deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['trips-data'] });
    },
    onError: (error) => {
      toast.error("Failed to delete trip");
      console.error('Error deleting trip:', error);
    }
  });

  const handleSaveTrip = async (trip: any) => {
    try {
      if (trip.id && trips.some((t: any) => t.id === trip.id)) {
        // Update existing trip
        updateMutation.mutate(trip);
      } else {
        // Add new trip
        createMutation.mutate(trip);
      }
    } catch (error) {
      console.error('Error saving trip:', error);
    }
  }
  const handleDeleteTrip = (tripId: number) => {
    setTrips(trips.filter((t: any) => t.id !== tripId))
    deleteMutation.mutate(tripId);
  }

  // Filter trips
  // const filteredTrips = useMemo(() => {
  //   return trips.filter((trip: any) => {
  //     const matchesSearch =
  //       trip?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       trip?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       trip?.destinations?.some((d: any) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))

  //     const matchesCategory = filterCategory === "all" || trip.categoryId === Number(filterCategory)
  //     const matchesStatus = filterStatus === "all" || trip.statusId === Number(filterStatus)

  //     return matchesSearch && matchesCategory && matchesStatus
  //   });
  // }, [trips, searchQuery, filterCategory, filterStatus]);

  // console.log("Filtered trips: ", filteredTrips)

  // Statistics
  const totalTrips = trips.length
  const upcomingTrips = trips.filter((t: any) => (t.startDate) > 0).length
  const completedTrips = trips.filter((t: any) => t.statusId === 5).length
  const totalDestinations = trips?.reduce((sum: any, t: any) => sum + t?.destinations?.length, 0)

  if (!mounted) return null

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-gray-50 max-h-screen overflow-auto">
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
            {data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((trip: any) => (
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
