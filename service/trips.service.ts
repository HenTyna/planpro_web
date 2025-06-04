import {http} from "@/utils/http";
const ServiceId = {
    TRIPS: '/api/wb/v1/trips'
}

const createTrip = async (trip: any) => {
    return http.post(ServiceId.TRIPS, trip);
}

const getTrips = async () => {
    return http.get(ServiceId.TRIPS).then(res => res?.data?.data).catch(error => error);
}

export const tripsService = {
    createTrip,
    getTrips
}