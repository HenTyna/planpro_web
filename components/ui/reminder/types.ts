export type ReminderCategory = "Personal" | "Work" | "Health" | "Finance" | "Social" | "Other"
export type ReminderPriority = "Low" | "Medium" | "High" | "Urgent"
export type ReminderStatus = "Active" | "Completed" | "Snoozed" | "Missed"
export type RecurrenceType = "None" | "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom"

export interface Reminder {
  id: string
  title: string
  description: string
  dueDate: string
  dueTime: string
  category: ReminderCategory
  priority: ReminderPriority
  reminderStatus: ReminderStatus
  recurring: boolean
  recurrenceType: RecurrenceType
  recurrenceEndDate?: string
  isStarred: boolean
  createdAt: string
  lastModified: string
  tags: string
}
