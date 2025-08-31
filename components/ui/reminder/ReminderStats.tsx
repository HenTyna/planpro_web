import React from "react"
import { Bell, Calendar, Clock, Check } from "lucide-react"
import { Card, CardContent } from "@/components/shared/ui/card"
import type { Reminder } from "./types"

interface ReminderStatsProps {
  reminders: Reminder[]
}

export const ReminderStats: React.FC<ReminderStatsProps> = ({ reminders }) => {
  const stats = {
    total: reminders.length,
    active: reminders?.filter((r) => r.reminderStatus === "Active").length,
    completed: reminders?.filter((r) => r.reminderStatus === "Completed").length,
    overdue: reminders.filter((r) => {
      const dueDate = new Date(`${r.dueDate}T${r.dueTime}:00`)
      return dueDate < new Date() && r.reminderStatus === "Active"
    }).length,
    today: reminders.filter((r) => {
      const dueDate = new Date(r.dueDate)
      const today = new Date()
      return dueDate.toDateString() === today.toDateString()
    }).length,
    upcoming: reminders.filter((r) => {
      const dueDate = new Date(`${r.dueDate}T${r.dueTime}:00`)
      return dueDate > new Date() && r.reminderStatus !== "Completed"
    }).length,
    starred: reminders.filter((r) => r.starred).length,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
            </div>
            <div className="rounded-full bg-green-100 p-2">
              <Bell className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.today}</h3>
            </div>
            <div className="rounded-full bg-blue-100 p-2">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.overdue}</h3>
            </div>
            <div className="rounded-full bg-red-100 p-2">
              <Clock className="h-5 w-5 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
            </div>
            <div className="rounded-full bg-purple-100 p-2">
              <Check className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
