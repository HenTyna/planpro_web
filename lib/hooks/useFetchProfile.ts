import { profileService } from "@/service/profile.service";
import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['profile-data'],
        queryFn: () => profileService.getProfile(),
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
        refetchInterval: 10 * 60 * 1000 // Refetch every 10 minutes
    });

    return {
        data,
        isLoading,
        isError
    }
}

export { useFetchProfile }