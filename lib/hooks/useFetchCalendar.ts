import { calendarService } from "@/service/calendar.service"
import { NoteService } from "@/service/note.service"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const useFetchCalendar = () => {
    const queryClient = useQueryClient()
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
    queryClient.prefetchQuery({
        queryKey: ["notes"],
        queryFn: () => NoteService.getMyNotes()
    })
  return {
    data,
    isLoading,
    error
  }
}

export default useFetchCalendar