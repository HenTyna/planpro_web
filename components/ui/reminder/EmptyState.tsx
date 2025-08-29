import React from "react"
import { Bell, Plus } from "lucide-react"
import { Button } from "@/components/shared/ui/Button"

interface EmptyStateProps {
  onCreateNew: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateNew }) => (
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
