

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Map, PlaneLanding, Calendar, Navigation } from "lucide-react"
import { Button } from "@/components/shared/ui/Button"

export default function TripSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="trips" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plan Your Trips with <span className="text-yellow-400">Interactive Maps</span>
          </h2>
          <p className="text-xl text-gray-600">
            Create detailed trip itineraries with Google Maps integration, location-based reminders, and shareable
            travel plans.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 opacity-30 blur-xl"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
                <div className="h-64 relative">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Map View"
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-bold text-lg">Japan Trip</h3>
                      <p className="text-white/80 text-sm">June 20 - July 5, 2025</p>
                    </div>
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500">
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Itinerary</h4>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" /> Add Day
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-yellow-600">1</span>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium">Tokyo Exploration</h5>
                        <div className="text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            <span>Shibuya, Shinjuku, Tokyo Tower</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>June 21, 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-yellow-600">2</span>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium">Kyoto Day Trip</h5>
                        <div className="text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            <span>Fushimi Inari, Kiyomizu-dera</span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>June 22, 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Map className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Interactive Maps</h3>
                  <p className="text-gray-600">
                    Plan your routes with Google Maps integration and save locations for easy navigation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <PlaneLanding className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Trip Cards</h3>
                  <p className="text-gray-600">
                    Create detailed trip cards with dates, locations, and activities all in one place.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Calendar className="h-5 w-5 text-teal-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">History Tracking</h3>
                  <p className="text-gray-600">
                    Access your past trips and itineraries to remember great experiences or plan similar journeys.
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500">
                  Plan Your Trip
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
