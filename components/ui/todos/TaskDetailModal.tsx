import { Button } from "@/components/shared/ui/Button"
import { formatDateCard } from "@/utils/dateformat"
import { CalendarDays, X } from "lucide-react"
import Image from "next/image"

// Task Detail Modal Component
const TaskDetailModal = ({ task, onClose }: any) => {
    if (!task) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Task Details</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {task.image && (
                        <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                            <Image src={task.image || "/placeholder.svg"} alt={task.title} width={400} height={192} className="w-full h-48 object-cover" />
                        </div>
                    )}

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <span className={`px-3 py-1 text-sm rounded-full text-white font-medium ${task.color}`}>
                                {task.property}
                            </span>
                            <span
                                className={`px-3 py-1 text-sm rounded-full font-medium ${task.status === "Completed"
                                    ? "bg-green-100 text-green-700"
                                    : task.status === "InProgress"
                                        ? "bg-orange-100 text-orange-700"
                                        : task.status === "OnHold"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-blue-100 text-blue-700"
                                    }`}
                            >
                                {task.status === "InProgress" ? "In Progress" : task.status === "OnHold" ? "On Hold" : task.status}
                            </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-line">{task.content}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Created</h4>
                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} className="text-gray-400" />
                                <span className="text-gray-800">{formatDateCard(task.createdAt)}</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Updated</h4>
                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} className="text-gray-400" />
                                <span className="text-gray-800">{formatDateCard(task.updatedAt)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            className="relative group overflow-hidden"
                            onClick={() => {
                                /* Handle edit */
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-teal-500 group-hover:to-blue-600 transition-all duration-300"></div>
                            <span className="relative z-10 flex items-center justify-center text-white">Edit Task</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailModal