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
    return http.delete(`${serviceId.REMINDER}/delete/${id}`)
}

const markAsReminderStarred = async (id: number, isStarred: boolean) => {
    return http.put(`${serviceId.REMINDER}/mark-as-starred/${id}`, JSON.stringify(isStarred), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const markAsReminderDone = async (id: number, isDone: boolean) => {
    return http.put(`${serviceId.REMINDER}/mark-as-done/${id}`, JSON.stringify(isDone), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const ReminderService = {
    getReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    markAsReminderStarred,
    markAsReminderDone
}
export default ReminderService