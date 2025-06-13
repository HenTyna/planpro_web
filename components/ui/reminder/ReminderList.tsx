import type React from "react"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  Bell,
  Calendar,
  Check,
  Clock,
  Edit,
  Filter,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
  BellRing,
  Tag,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  StarOff,
} from "lucide-react"
import { format, addDays, isAfter, isBefore, parseISO, formatDistanceToNow } from "date-fns"
import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import { Label } from "@/components/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select"
import { Switch } from "@/components/shared/ui/swtich"
import { Badge } from "@/components/shared/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/shared/ui/dialog"
import { cn } from "@/utils/utils"
import { Card, CardContent } from "@/components/shared/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/ui/tabs"
import { Textarea } from "@/components/shared/ui/texarea"

// Types
type ReminderCategory = "Personal" | "Work" | "Health" | "Finance" | "Social" | "Other"
type ReminderPriority = "Low" | "Medium" | "High" | "Urgent"
type ReminderStatus = "Active" | "Completed" | "Snoozed" | "Missed"
type RecurrenceType = "None" | "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom"

interface Reminder {
  id: string
  title: string
  description: string
  dueDate: string
  dueTime: string
  category: ReminderCategory
  priority: ReminderPriority
  status: ReminderStatus
  isRecurring: boolean
  recurrenceType: RecurrenceType
  recurrenceEndDate?: string
  isStarred: boolean
  createdAt: string
  lastModified: string
  tags: string[]
  attachments?: string[]
  notes?: string
}

// Sample data
const generateSampleReminders = (): Reminder[] => {
  const now = new Date()

  return [
    {
      id: "rem-001",
      title: "Pay monthly bills",
      description: "Pay electricity, water, and internet bills",
      dueDate: format(addDays(now, 2), "yyyy-MM-dd"),
      dueTime: "18:00",
      category: "Finance",
      priority: "High",
      status: "Active",
      isRecurring: true,
      recurrenceType: "Monthly",
      isStarred: true,
      createdAt: format(addDays(now, -5), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["bills", "monthly", "finance"],
    },
    {
      id: "rem-002",
      title: "Doctor's appointment",
      description: "Annual checkup with Dr. Smith",
      dueDate: format(addDays(now, 7), "yyyy-MM-dd"),
      dueTime: "10:30",
      category: "Health",
      priority: "Medium",
      status: "Active",
      isRecurring: false,
      recurrenceType: "None",
      isStarred: false,
      createdAt: format(addDays(now, -10), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -10), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["health", "doctor", "annual"],
    },
    {
      id: "rem-003",
      title: "Team meeting",
      description: "Weekly team sync with product and design",
      dueDate: format(addDays(now, 1), "yyyy-MM-dd"),
      dueTime: "14:00",
      category: "Work",
      priority: "Medium",
      status: "Active",
      isRecurring: true,
      recurrenceType: "Weekly",
      isStarred: false,
      createdAt: format(addDays(now, -15), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -2), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["meeting", "team", "weekly"],
    },
    {
      id: "rem-004",
      title: "Gym session",
      description: "Cardio and strength training",
      dueDate: format(now, "yyyy-MM-dd"),
      dueTime: "07:00",
      category: "Health",
      priority: "Low",
      status: "Completed",
      isRecurring: true,
      recurrenceType: "Daily",
      isStarred: false,
      createdAt: format(addDays(now, -30), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(now, "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["fitness", "health", "routine"],
    },
    {
      id: "rem-005",
      title: "Call mom",
      description: "Weekly catch-up call",
      dueDate: format(addDays(now, -1), "yyyy-MM-dd"),
      dueTime: "19:00",
      category: "Personal",
      priority: "Medium",
      status: "Missed",
      isRecurring: true,
      recurrenceType: "Weekly",
      isStarred: true,
      createdAt: format(addDays(now, -20), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -1), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["family", "personal", "call"],
    },
    {
      id: "rem-006",
      title: "Project deadline",
      description: "Submit final project deliverables",
      dueDate: format(addDays(now, 14), "yyyy-MM-dd"),
      dueTime: "17:00",
      category: "Work",
      priority: "Urgent",
      status: "Active",
      isRecurring: false,
      recurrenceType: "None",
      isStarred: true,
      createdAt: format(addDays(now, -45), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -3), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["project", "deadline", "important"],
    },
    {
      id: "rem-007",
      title: "Dinner reservation",
      description: "Anniversary dinner at Le Bistro",
      dueDate: format(addDays(now, 10), "yyyy-MM-dd"),
      dueTime: "20:00",
      category: "Social",
      priority: "Medium",
      status: "Active",
      isRecurring: false,
      recurrenceType: "None",
      isStarred: false,
      createdAt: format(addDays(now, -15), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -15), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["dinner", "anniversary", "reservation"],
    },
    {
      id: "rem-008",
      title: "Tax filing deadline",
      description: "Submit annual tax returns",
      dueDate: format(addDays(now, 30), "yyyy-MM-dd"),
      dueTime: "23:59",
      category: "Finance",
      priority: "High",
      status: "Active",
      isRecurring: true,
      recurrenceType: "Yearly",
      isStarred: true,
      createdAt: format(addDays(now, -60), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -5), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["taxes", "finance", "deadline"],
    },
    {
      id: "rem-009",
      title: "Renew subscription",
      description: "Renew streaming service subscription",
      dueDate: format(addDays(now, 5), "yyyy-MM-dd"),
      dueTime: "12:00",
      category: "Personal",
      priority: "Low",
      status: "Snoozed",
      isRecurring: true,
      recurrenceType: "Monthly",
      isStarred: false,
      createdAt: format(addDays(now, -25), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -1), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["subscription", "renewal", "entertainment"],
    },
    {
      id: "rem-010",
      title: "Friend's birthday",
      description: "Buy a gift for Sarah's birthday",
      dueDate: format(addDays(now, 3), "yyyy-MM-dd"),
      dueTime: "09:00",
      category: "Social",
      priority: "Medium",
      status: "Active",
      isRecurring: true,
      recurrenceType: "Yearly",
      isStarred: false,
      createdAt: format(addDays(now, -40), "yyyy-MM-dd'T'HH:mm:ss"),
      lastModified: format(addDays(now, -40), "yyyy-MM-dd'T'HH:mm:ss"),
      tags: ["birthday", "gift", "friend"],
    },
  ]
}

// Helper components
const ReminderCard = ({
  reminder,
  onEdit,
  onDelete,
  onStatusChange,
  onStarToggle,
}: {
  reminder: Reminder
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ReminderStatus) => void
  onStarToggle: (id: string) => void
}) => {
  const dueDate = parseISO(`${reminder.dueDate}T${reminder.dueTime}:00`)
  const isPastDue = isBefore(dueDate, new Date()) && reminder.status === "Active"
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
    if (!reminder.isRecurring) return null

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
        reminder.status === "Completed" ? "opacity-75" : "",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => onStatusChange(reminder.id, reminder.status === "Completed" ? "Active" : "Completed")}
              className={cn(
                "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                reminder.status === "Completed" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 bg-white",
              )}
            >
              {reminder.status === "Completed" && <Check className="h-3 w-3" />}
            </button>

            <div className="space-y-1">
              <div className="flex items-center">
                <h3
                  className={cn(
                    "font-medium",
                    reminder.status === "Completed" ? "line-through text-gray-500" : "text-gray-900",
                  )}
                >
                  {reminder.title}
                </h3>
                {reminder.isStarred && <Star className="h-4 w-4 ml-2 text-yellow-500 fill-yellow-500" />}
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

                <Badge variant="outline" className={getStatusColor(reminder.status)}>
                  {reminder.status}
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
              {reminder.isStarred ? (
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

const EmptyState = ({ onCreateNew }: { onCreateNew: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="rounded-full bg-blue-50 p-3 mb-4">
      <Bell className="h-8 w-8 text-blue-500" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-1">No reminders found</h3>
    <p className="text-gray-500 mb-4 max-w-md">
      You don't have any reminders that match your current filters. Create a new reminder or adjust your filters.
    </p>
    <Button onClick={onCreateNew}>
      <Plus className="h-4 w-4 mr-2" />
      Create New Reminder
    </Button>
  </div>
)

const ReminderForm = ({
  reminder,
  onSave,
  onCancel,
}: {
  reminder: Partial<Reminder>
  onSave: (reminder: Partial<Reminder>) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<Partial<Reminder>>(
    reminder || {
      title: "",
      description: "",
      dueDate: format(new Date(), "yyyy-MM-dd"),
      dueTime: "12:00",
      category: "Personal" as ReminderCategory,
      priority: "Medium" as ReminderPriority,
      status: "Active" as ReminderStatus,
      isRecurring: false,
      recurrenceType: "None" as RecurrenceType,
      isStarred: false,
      tags: [],
    },
  )

  const [tagInput, setTagInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter reminder title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter reminder details"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input id="dueDate" name="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueTime">Due Time</Label>
          <Input id="dueTime" name="dueTime" type="time" value={formData.dueTime} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value: any) => handleSelectChange("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value: any) => handleSelectChange("priority", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Snoozed">Snoozed</SelectItem>
            <SelectItem value="Missed">Missed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isRecurring"
          checked={formData.isRecurring}
          onCheckedChange={(checked: any) => handleSwitchChange("isRecurring", checked)}
        />
        <Label htmlFor="isRecurring">Recurring Reminder</Label>
      </div>

      {formData.isRecurring && (
        <div className="space-y-2">
          <Label htmlFor="recurrenceType">Recurrence Pattern</Label>
          <Select
            value={formData.recurrenceType}
            onValueChange={(value: any) => handleSelectChange("recurrenceType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select recurrence pattern" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
              <SelectItem value="Yearly">Yearly</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id="isStarred"
          checked={formData.isStarred}
          onCheckedChange={(checked) => handleSwitchChange("isStarred", checked)}
        />
        <Label htmlFor="isStarred">Star this reminder</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="tagInput"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Add tags"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddTag()
              }
            }}
          />
          <Button type="button" onClick={handleAddTag} variant="outline">
            Add
          </Button>
        </div>

        {formData.tags && formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Reminder</Button>
      </DialogFooter>
    </form>
  )
}

const ReminderDetailView = ({
  reminder,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  reminder: Reminder
  onClose: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: ReminderStatus) => void
}) => {
  const dueDate = parseISO(`${reminder.dueDate}T${reminder.dueTime}:00`)
  const isPastDue = isBefore(dueDate, new Date()) && reminder.status === "Active"

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

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onStatusChange(reminder.id, reminder.status === "Completed" ? "Active" : "Completed")}
            className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
              reminder.status === "Completed" ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300 bg-white",
            )}
          >
            {reminder.status === "Completed" && <Check className="h-4 w-4" />}
          </button>

          <h2
            className={cn(
              "text-xl font-semibold",
              reminder.status === "Completed" ? "line-through text-gray-500" : "text-gray-900",
            )}
          >
            {reminder.title}
          </h2>

          {reminder.isStarred && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-blue-600" onClick={() => onEdit(reminder.id)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600" onClick={() => onDelete(reminder.id)}>
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date & Time</h3>
            <div className="flex items-center text-gray-900">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              <span className={isPastDue ? "text-red-600 font-medium" : ""}>
                {format(dueDate, "MMMM d, yyyy")} at {format(dueDate, "h:mm a")}
              </span>
            </div>
            {isPastDue && <div className="text-red-600 text-sm mt-1">Overdue by {formatDistanceToNow(dueDate)}</div>}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <Badge className={getStatusColor(reminder.status)}>{reminder.status}</Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
            <div className="flex items-center">
              {getCategoryIcon(reminder.category)}
              <span className="ml-2">{reminder.category}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Priority</h3>
            <Badge className={getPriorityColor(reminder.priority)}>{reminder.priority}</Badge>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Recurrence</h3>
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 text-blue-500" />
              <span>{reminder.isRecurring ? reminder.recurrenceType : "None"}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
            <div className="text-gray-900">{format(parseISO(reminder.createdAt), "MMMM d, yyyy")}</div>
          </div>
        </div>
      </div>

      {reminder.description && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <div className="bg-white border border-gray-200 rounded-lg p-3 text-gray-700">{reminder.description}</div>
        </div>
      )}

      {reminder.tags && reminder.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {reminder.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

// Main component
export default function ReminderPage() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<ReminderCategory | "All">("All")
  const [statusFilter, setStatusFilter] = useState<ReminderStatus | "All">("All")
  const [priorityFilter, setPriorityFilter] = useState<ReminderPriority | "All">("All")
  const [currentTab, setCurrentTab] = useState<"all" | "today" | "upcoming" | "completed" | "starred">("all")

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null)

  // Load sample data
  useEffect(() => {
    const sampleData = generateSampleReminders()
    setReminders(sampleData)
    setFilteredReminders(sampleData)
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...reminders]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (reminder) =>
          reminder.title.toLowerCase().includes(query) ||
          reminder.description.toLowerCase().includes(query) ||
          (reminder.tags && reminder.tags.some((tag) => tag.toLowerCase().includes(query))),
      )
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((reminder) => reminder.category === categoryFilter)
    }

    // Apply status filter
    if (statusFilter !== "All") {
      result = result.filter((reminder) => reminder.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      result = result.filter((reminder) => reminder.priority === priorityFilter)
    }

    // Apply tab filters
    switch (currentTab) {
      case "today":
        result = result.filter(
          (reminder) => format(parseISO(reminder.dueDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
        )
        break
      case "upcoming":
        result = result.filter(
          (reminder) => isAfter(parseISO(reminder.dueDate), new Date()) && reminder.status !== "Completed",
        )
        break
      case "completed":
        result = result.filter((reminder) => reminder.status === "Completed")
        break
      case "starred":
        result = result.filter((reminder) => reminder.isStarred)
        break
    }

    setFilteredReminders(result)
  }, [reminders, searchQuery, categoryFilter, statusFilter, priorityFilter, currentTab])

  // Calculate statistics
  const stats = {
    total: reminders.length,
    active: reminders.filter((r) => r.status === "Active").length,
    completed: reminders.filter((r) => r.status === "Completed").length,
    overdue: reminders.filter((r) => {
      const dueDate = parseISO(`${r.dueDate}T${r.dueTime}:00`)
      return isBefore(dueDate, new Date()) && r.status === "Active"
    }).length,
    today: reminders.filter((r) => format(parseISO(r.dueDate), "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"))
      .length,
    upcoming: reminders.filter((r) => isAfter(parseISO(r.dueDate), new Date()) && r.status !== "Completed").length,
    starred: reminders.filter((r) => r.isStarred).length,
  }

  // Handlers
  const handleCreateReminder = () => {
    setCurrentReminder(null)
    setIsCreateModalOpen(true)
  }

  const handleEditReminder = (id: string) => {
    const reminder = reminders.find((r) => r.id === id)
    if (reminder) {
      setCurrentReminder(reminder)
      setIsEditModalOpen(true)
    }
  }

  const handleDeleteReminder = (id: string) => {
    const reminder = reminders.find((r) => r.id === id)
    if (reminder) {
      setCurrentReminder(reminder)
      setIsDeleteModalOpen(true)
    }
  }

  const handleStatusChange = (id: string, status: ReminderStatus) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, status, lastModified: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss") }
          : reminder,
      ),
    )
  }

  const handleStarToggle = (id: string) => {
    setReminders((prev) =>
      prev.map((reminder) =>
        reminder.id === id
          ? { ...reminder, isStarred: !reminder.isStarred, lastModified: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss") }
          : reminder,
      ),
    )
  }

  const confirmDelete = () => {
    if (currentReminder) {
      setReminders((prev) => prev.filter((r) => r.id !== currentReminder.id))
      setIsDeleteModalOpen(false)
      setCurrentReminder(null)
    }
  }

  const saveReminder = (reminderData: Partial<Reminder>) => {
    const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss")

    if (isEditModalOpen && currentReminder) {
      // Update existing reminder
      setReminders((prev) =>
        prev.map((reminder) =>
          reminder.id === currentReminder.id
            ? {
              ...reminder,
              ...reminderData,
              lastModified: now,
            }
            : reminder,
        ),
      )
      setIsEditModalOpen(false)
    } else {
      // Create new reminder
      const newReminder: Reminder = {
        id: `rem-${Math.random().toString(36).substr(2, 9)}`,
        title: reminderData.title || "",
        description: reminderData.description || "",
        dueDate: reminderData.dueDate || format(new Date(), "yyyy-MM-dd"),
        dueTime: reminderData.dueTime || "12:00",
        category: (reminderData.category as ReminderCategory) || "Personal",
        priority: (reminderData.priority as ReminderPriority) || "Medium",
        status: (reminderData.status as ReminderStatus) || "Active",
        isRecurring: reminderData.isRecurring || false,
        recurrenceType: (reminderData.recurrenceType as RecurrenceType) || "None",
        isStarred: reminderData.isStarred || false,
        createdAt: now,
        lastModified: now,
        tags: reminderData.tags || [],
      }

      setReminders((prev) => [...prev, newReminder])
      setIsCreateModalOpen(false)
    }

    setCurrentReminder(null)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setCategoryFilter("All")
    setStatusFilter("All")
    setPriorityFilter("All")
  }

  return (
    <div className="bg-gray-50 max-h-screen">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-70"></div>

          <div className="relative container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-2 text-green-500" />
                  <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Reminders
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">Never miss important dates and deadlines</p>
              </div>

              <div className="flex items-center space-x-3">
                <Button onClick={handleCreateReminder}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Reminder
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container mx-auto px-4 py-4">
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
        </div>

        {/* Tabs */}
        <div className="container mx-auto px-4">
          <Tabs
            defaultValue="all"
            value={currentTab}
            onValueChange={(value: any) => setCurrentTab(value as any)}
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
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        {/* Search and filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search reminders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Select value={categoryFilter} onValueChange={(value: any) => setCategoryFilter(value as any)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Snoozed">Snoozed</SelectItem>
                <SelectItem value="Missed">Missed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" onClick={resetFilters} className="h-10 w-10">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Reminders list */}
        <div className="space-y-4">
          {filteredReminders.length > 0 ? (
            filteredReminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                reminder={reminder}
                onEdit={handleEditReminder}
                onDelete={handleDeleteReminder}
                onStatusChange={handleStatusChange}
                onStarToggle={handleStarToggle}
              />
            ))
          ) : (
            <EmptyState onCreateNew={handleCreateReminder} />
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Reminder</DialogTitle>
          </DialogHeader>
          <ReminderForm reminder={{}} onSave={saveReminder} onCancel={() => setIsCreateModalOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Reminder</DialogTitle>
          </DialogHeader>
          {currentReminder && (
            <ReminderForm reminder={currentReminder} onSave={saveReminder} onCancel={() => setIsEditModalOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Reminder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700">
              Are you sure you want to delete this reminder?
              <span className="font-medium block mt-2">"{currentReminder?.title}"</span>
            </p>
            <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail View Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reminder Details</DialogTitle>
          </DialogHeader>
          {currentReminder && (
            <ReminderDetailView
              reminder={currentReminder}
              onClose={() => setIsDetailModalOpen(false)}
              onEdit={handleEditReminder}
              onDelete={handleDeleteReminder}
              onStatusChange={handleStatusChange}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
