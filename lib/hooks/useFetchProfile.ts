import { profileService } from "@/service/profile.service";
import { useQuery } from "@tanstack/react-query";

const useFetchProfile = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.getProfile(),
        retry: 0,
    });
    return {
        data,
        isLoading,
        isError,
    }
}
export { useFetchProfile }