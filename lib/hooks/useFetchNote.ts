import { NoteService } from "@/service/note.service"
import { useQuery } from "@tanstack/react-query"

const useFetchNote = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["notes"],
        queryFn: async () => {
            const response = await NoteService.getMyNotes()
            return response.data
        },
        select: (data) => data.data
    })
    return { data, isLoading, error }
}

export default useFetchNote

