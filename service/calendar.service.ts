import { http } from "@/utils/http"
const calendarServiceId = {
    CALENDAR: '/api/wb/v1/calendar'
}

const getCalendar = async () => {
    return http.get(calendarServiceId.CALENDAR)
}

const createCalendar = async (data: any) => {
    return http.post(calendarServiceId.CALENDAR, data)
}

const updateCalendar = async (id: number, data: any) => {
    return http.put(`${calendarServiceId.CALENDAR}/${id}`, data)
}

const deleteCalendar = async (id: number) => {
    return http.delete(`${calendarServiceId.CALENDAR}/${id}`)
}

const getCalendarById = async (id: number) => {
    return http.get(`${calendarServiceId.CALENDAR}/${id}`)
}

export const calendarService = {
    getCalendar,
    createCalendar,
    updateCalendar,
    deleteCalendar,
    getCalendarById
}
