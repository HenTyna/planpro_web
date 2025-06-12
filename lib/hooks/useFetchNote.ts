import { NoteService } from "@/service/note.service"
import { useQuery } from "@tanstack/react-query"

const useFetchNote = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes"],
        queryFn: () => NoteService.getMyNotes(),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60 * 5,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    })
    return { data, isLoading, error }
}

export default useFetchNote

