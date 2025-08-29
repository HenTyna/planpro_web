import { http } from "@/utils/http"

const serviceId = {
    REMINDER: '/api/wb/v1/reminders'
}

const getReminders = async (params: any) => {
    return http.get(serviceId.REMINDER, { params })
}

const createReminder = async (data: any) => {
    return http.post(serviceId.REMINDER + '/create', data)
}

const updateReminder = async (id: number, data: any) => {
    return http.put(`${serviceId.REMINDER}/update/${id}`, data)
}

const deleteReminder = async (id: number) => {
    return http.put(`${serviceId.REMINDER}/delete/${id}`)
}

const ReminderService = {
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder
}
export default ReminderService