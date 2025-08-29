import React from "react"
import { Bell, Calendar, Clock, Check, Star } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"
import type { Reminder } from "./types"

interface ReminderTabsProps {
  currentTab: "all" | "today" | "upcoming" | "completed" | "starred"
  onTabChange: (tab: "all" | "today" | "upcoming" | "completed" | "starred") => void
  reminders: Reminder[]
}

export const ReminderTabs: React.FC<ReminderTabsProps> = ({ currentTab, onTabChange, reminders }) => {
  const stats = {
    total: reminders.length,
    today: reminders.filter((r) => {
      const dueDate = new Date(r.dueDate)
      const today = new Date()
      return dueDate.toDateString() === today.toDateString()
    }).length,
    upcoming: reminders.filter((r) => {
      const dueDate = new Date(`${r.dueDate}T${r.dueTime}:00`)
      return dueDate > new Date() && r.reminderStatus !== "Completed"
    }).length,
    completed: reminders.filter((r) => r.reminderStatus === "Completed").length,
    starred: reminders.filter((r) => r.starred).length,
  }

  return (
    <Tabs
      defaultValue="all"
      value={currentTab}
      onValueChange={(value: any) => onTabChange(value as any)}
      className="w-full"
    >
      <TabsList className="grid grid-cols-5 w-full max-w-3xl">
        <TabsTrigger value="all" className="flex items-center">
          <Bell className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">All</span>
          <span className="ml-1.5">({stats.total})</span>
        </TabsTrigger>
        <TabsTrigger value="today" className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Today</span>
          <span className="ml-1.5">({stats.today})</span>
        </TabsTrigger>
        <TabsTrigger value="upcoming" className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Upcoming</span>
          <span className="ml-1.5">({stats.upcoming})</span>
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center">
          <Check className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Completed</span>
          <span className="ml-1.5">({stats.completed})</span>
        </TabsTrigger>
        <TabsTrigger value="starred" className="flex items-center">
          <Star className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Starred</span>
          <span className="ml-1.5">({stats.starred})</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
