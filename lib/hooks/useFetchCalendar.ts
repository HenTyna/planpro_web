import { calendarService } from "@/service/calendar.service"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const useFetchCalendar = () => {
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["calendar"],
        queryFn: () => calendarService.getCalendar(),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        
    })
    console.log("data", data)
  return {
    data,
    isLoading,
    error
  }
}

export default useFetchCalendar