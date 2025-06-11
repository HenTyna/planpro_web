import {http} from "@/utils/http";
const ServiceId = {
    TRIPS: '/api/wb/v1/trips'
}

const createTrip = async (trip: any) => {
    return http.post(ServiceId.TRIPS, trip);
}

const updateTrip = async (tripId: any, body: any) => {
    return http.put(`${ServiceId.TRIPS}/${tripId}` , body);
}

const getTrips = async () => {
    return http.get(ServiceId.TRIPS).then(res => res?.data?.data).catch(error => error);
}

const deleteTrip = async (tripId: string) => {
    return http.delete(`${ServiceId.TRIPS}/${tripId}`);
}

const removeDestination = async (destinationId: string) => {
    return http.delete(`${ServiceId.TRIPS}/destination/${destinationId}`);
}

export const tripsService = {
    createTrip,
    updateTrip,
    getTrips,
    deleteTrip,
    removeDestination
}