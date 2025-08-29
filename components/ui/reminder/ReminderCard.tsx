import React from "react"
import { format, isBefore, parseISO } from "date-fns"
import {
  AlertCircle,
  Check,
  Clock,
  Edit,
  RefreshCw,
  Trash2,
  BellRing,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  StarOff,
} from "lucide-react"
import { Button } from "@/components/shared/ui/Button"
import { Badge } from "@/components/shared/ui/badge"
import { Card, CardContent } from "@/components/shared/ui/card"
import { cn } from "@/utils/utils"
import type { Reminder, ReminderCategory, ReminderPriority, ReminderStatus } from "./types"

interface ReminderCardProps {
  reminder: Reminder
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ReminderStatus) => void
  onStarToggle: (id: string) => void
}

export const ReminderCard: React.FC<ReminderCardProps> = ({
  reminder,
  onEdit,
  onDelete,
  onStatusChange,
  onStarToggle,
}) => {
  const dueDate = parseISO(`${reminder.dueDate}T${reminder.dueTime}:00`)
  const isPastDue = isBefore(dueDate, new Date()) && reminder.reminderStatus === "Active"
  const isToday = format(dueDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

  const getStatusColor = (status: ReminderStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "Snoozed":
        return "bg-yellow-100 text-yellow-800"
      case "Missed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: ReminderPriority) => {
    switch (priority) {
      case "Low":
        return "bg-blue-50 text-blue-600"
      case "Medium":
        return "bg-yellow-50 text-yellow-600"
      case "High":
        return "bg-orange-50 text-orange-600"
      case "Urgent":
        return "bg-red-50 text-red-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  const getCategoryIcon = (category: ReminderCategory) => {
    switch (category) {
      case "Personal":
        return <Tag className="h-4 w-4 text-purple-500" />
      case "Work":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />
      case "Health":
        return <AlertCircle className="h-4 w-4 text-green-500" />
      case "Finance":
        return <ArrowDownRight className="h-4 w-4 text-orange-500" />
      case "Social":
        return <BellRing className="h-4 w-4 text-pink-500" />
      case "Other":
        return <Tag className="h-4 w-4 text-gray-500" />
      default:
        return <Tag className="h-4 w-4 text-gray-500" />
    }
  }

  const getTimeDisplay = () => {
    if (isPastDue) {
      return <span className="text-red-500 font-medium">Overdue</span>
    }

    if (isToday) {
      return <span className="text-green-600 font-medium">Today at {format(dueDate, "h:mm a")}</span>
    }

    return (
      <span className="text-gray-600">
        {format(dueDate, "MMM d, yyyy")} at {format(dueDate, "h:mm a")}
      </span>
    )
  }

  const getRecurrenceText = () => {
    if (!reminder.recurring) return null

    return (
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <RefreshCw className="h-3 w-3 mr-1" />
        <span>{reminder.recurrenceType}</span>
      </div>
    )
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isPastDue ? "border-red-200 bg-red-50/30" : "",
        reminder.reminderStatus === "Completed" ? "opacity-75" : "",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => onStatusChange(reminder.id, reminder.reminderStatus === "Completed" ? "Active" : "Completed")}
              className={cn(
                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                reminder.reminderStatus === "Completed" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 bg-white",
              )}
            >
              {reminder.reminderStatus === "Completed" && <Check className="h-3 w-3" />}
            </button>

            <div className="space-y-1">
              <div className="flex items-center">
                <h3
                  className={cn(
                    "font-medium",
                    reminder.reminderStatus === "Completed" ? "line-through text-gray-500" : "text-gray-900",
                  )}
                >
                  {reminder.title}
                </h3>
                {reminder.starred && <Star className="h-4 w-4 ml-2 text-yellow-500 fill-yellow-500" />}
              </div>

              <p className="text-sm text-gray-500 line-clamp-2">{reminder.description}</p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className="flex items-center text-xs">
                  <Clock className="h-3 w-3 mr-1 text-gray-500" />
                  {getTimeDisplay()}
                </div>

                {getRecurrenceText()}

                <Badge variant="outline" className={getPriorityColor(reminder.priority)}>
                  {reminder.priority}
                </Badge>

                <Badge variant="outline" className={getStatusColor(reminder.reminderStatus)}>
                  {reminder.reminderStatus}
                </Badge>

                <Badge variant="outline" className="bg-gray-50 text-gray-700 flex items-center gap-1">
                  {getCategoryIcon(reminder.category)}
                  {reminder.category}
                </Badge>
              </div>

              {reminder.tags && reminder.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {reminder.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-yellow-500"
              onClick={() => onStarToggle(reminder.id)}
            >
              {reminder.starred ? (
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-blue-500"
              onClick={() => onEdit(reminder.id)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-red-500"
              onClick={() => onDelete(reminder.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
