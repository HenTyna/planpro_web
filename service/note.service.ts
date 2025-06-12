import { http } from "@/utils/http"

const serviceId = {
    MY_NOTES: '/api/wb/v1/my-notes'
}

const getMyNotes = async () => {
    return http.get(serviceId.MY_NOTES)
}

const createNote = async (data: any) => {
    return http.post(serviceId.MY_NOTES, data)
}

const updateNote = async (id: number, data: any) => {
    return http.put(`${serviceId.MY_NOTES}/${id}`, data)
}

const deleteNote = async (id: number) => {
    return http.put(`${serviceId.MY_NOTES}/${id}/delete`)
}

const getNoteById = async (id: number) => {
    return http.get(`${serviceId.MY_NOTES}/${id}`)
}


export const NoteService = {
    getMyNotes,
    createNote,
    updateNote,
    deleteNote,
    getNoteById
}
