import { tripsService } from "@/service/trips.service";
import { useQuery } from "@tanstack/react-query";

const useFetchTrips = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['trips-data'],
        queryFn: () => tripsService.getTrips(),
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
        
    })

    return {
        data,
        isLoading,
        isError
    }

}

export default useFetchTrips