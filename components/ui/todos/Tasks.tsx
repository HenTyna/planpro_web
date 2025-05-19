import React, { useState } from 'react'
import taskIcon from '@/public/asset/task.png'
import Image from 'next/image'
import { CalendarDays, Plus, MoreHorizontal } from 'lucide-react'
import { formatDateCard } from '@/utils/dateformat'
import AddTodos from './AddTodos'

// Consolidated task data with proper status values
const allTasks = [
    // Todo tasks
    {
        id: 1,
        title: "Todo",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna euismod, fermentum nulla a, tincidunt ex.",
        createdAt: "20250510000000",
        updatedAt: "20250511000000",
        color: "bg-yellow-400",
        status: "Todo",
        property: "Design",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-3.jpg"
    },
    // InProgress tasks
    {
        id: 2,
        title: "UI Improvements",
        content: "Improve the navigation bar design and apply new theme colors.",
        createdAt: "20250508000000",
        updatedAt: "20250512000000",
        color: "bg-blue-400",
        status: "InProgress",
        property: "Frontend",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-2.jpg"
    },
    {
        id: 6,
        title: "Wireframe Review",
        content: "Review wireframes with design and product team to confirm alignment.",
        createdAt: "20250510080000",
        updatedAt: "20250515094500",
        color: "bg-indigo-400",
        status: "InProgress",
        property: "Design",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-3.jpg"
    },
    {
        id: 7,
        title: "API Integration",
        content: "Integrate third-party APIs for enhanced data syncing.",
        createdAt: "20250507093000",
        updatedAt: "20250512123000",
        color: "bg-orange-400",
        status: "InProgress",
        property: "Backend",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-2.jpg"
    },
    {
        id: 8,
        title: "Real-time Notifications",
        content: "Implement WebSocket for live notification updates.",
        createdAt: "20250501091500",
        updatedAt: "20250511130000",
        color: "bg-teal-400",
        status: "InProgress",
        property: "Frontend",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-4.jpg"
    },
    {
        id: 9,
        title: "Client Feedback",
        content: "Gather and document feedback from beta testers.",
        createdAt: "20250506000000",
        updatedAt: "20250509000000",
        color: "bg-green-400",
        status: "InProgress",
        property: "Product",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-1.jpg"
    },
    // OnHold tasks
    {
        id: 3,
        title: "Database Optimization",
        content: "Analyze and optimize PostgreSQL indexes for faster queries.",
        createdAt: "20250430000000",
        updatedAt: "20250505000000",
        color: "bg-red-400",
        status: "OnHold",
        property: "Backend",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-4.jpg"
    },
    {
        id: 10,
        title: "Marketing Strategy",
        content: "Paused until product scope is finalized for Q3 campaign.",
        createdAt: "20250502083000",
        updatedAt: "20250508093000",
        color: "bg-gray-400",
        status: "OnHold",
        property: "Marketing",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-2.jpg"
    },
    {
        id: 11,
        title: "Data Migration",
        content: "Postponed due to pending legacy system audit.",
        createdAt: "20250429090000",
        updatedAt: "20250503093000",
        color: "bg-red-300",
        status: "OnHold",
        property: "Infrastructure",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-3.jpg"
    },
    // Completed tasks
    {
        id: 4,
        title: "Testing Phase",
        content: "Conduct unit and integration testing for recent modules.",
        createdAt: "20250501000000",
        updatedAt: "20250513000000",
        color: "bg-purple-400",
        status: "Completed",
        property: "QA",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-3.jpg"
    },
    {
        id: 12,
        title: "Bug Fix Sprint",
        content: "Resolved high-priority bugs reported from the last release.",
        createdAt: "20250425093000",
        updatedAt: "20250505090000",
        color: "bg-green-400",
        status: "Completed",
        property: "QA",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-4.jpg"
    },
    {
        id: 13,
        title: "Security Audit",
        content: "Completed penetration testing and resolved critical vulnerabilities.",
        createdAt: "20250428090000",
        updatedAt: "20250503093000",
        color: "bg-emerald-400",
        status: "Completed",
        property: "DevOps",
        image: "https://matdash-angular-main.netlify.app/assets/images/taskboard/kanban-img-1.jpg"
    }
];

// Column configuration
const columns = [
    {
        id: 'Todo',
        title: 'Todo',
        bgColor: 'bg-slate-100',
        headerColor: 'bg-slate-200'
    },
    {
        id: 'InProgress',
        title: 'In Progress',
        bgColor: 'bg-blue-100',
        headerColor: 'bg-blue-200'
    },
    {
        id: 'OnHold',
        title: 'On Hold',
        bgColor: 'bg-orange-100',
        headerColor: 'bg-orange-200'
    },
    {
        id: 'Completed',
        title: 'Completed',
        bgColor: 'bg-green-100',
        headerColor: 'bg-green-200'
    }
];

// Individual Task Card Component
const TaskCard = ({ task, onTaskClick }: any) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
            onClick={() => onTaskClick(task)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onTaskClick(task);
                }
            }}
            aria-label={`Task: ${task.title}`}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{task.title}</h3>
                <button
                    className="text-gray-400 hover:text-gray-600 p-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Handle task options menu
                    }}
                    aria-label="Task options"
                >
                    <MoreHorizontal size={16} />
                </button>
            </div>

            {task.image && !imageError && (
                <div className="mb-3">
                    <img
                        src={task.image}
                        alt={`${task.title} preview`}
                        className="rounded-md w-full h-24 object-cover"
                        onError={() => setImageError(true)}
                        loading="lazy"
                    />
                </div>
            )}

            <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.content}</p>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <CalendarDays size={12} />
                    <span>{formatDateCard(task.createdAt)}</span>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full text-white font-medium ${task.color}`}>
                    {task.property}
                </span>
            </div>
        </div>
    );
};

// Column Component
const KanbanColumn = ({ column, tasks, onTaskClick, onAddTask }: any) => {
    const taskCount = tasks.length;

    return (
        <div className={`${column.bgColor} rounded-lg shadow-sm border border-gray-200 flex flex-col h-full`}>
            <div className={`${column.headerColor} p-4 rounded-t-lg border-b border-gray-200`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-gray-800">{column.title}</h2>
                        <span className="bg-white text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                            {taskCount}
                        </span>
                    </div>
                    <button
                        onClick={() => onAddTask(column.id)}
                        className="text-gray-600 hover:text-gray-800 p-1 hover:bg-white hover:bg-opacity-50 rounded"
                        aria-label={`Add task to ${column.title}`}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <div className="p-3 flex-1 overflow-y-auto">
                <div className="space-y-3">
                    {tasks.map((task: any) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onTaskClick={onTaskClick}
                        />
                    ))}
                    {taskCount === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <p className="text-sm">No tasks yet</p>
                            <button
                                onClick={() => onAddTask(column.id)}
                                className="text-purple-600 hover:text-purple-700 text-sm mt-2 underline"
                            >
                                Add your first task
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Main Tasks Component
const Tasks = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [showAddTask, setShowAddTask] = useState(false);
    // Filter tasks by status
    const getTasksByStatus = (status: any) => {
        return allTasks.filter(task => task.status === status);
    };

    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        // You can implement a modal or drawer to show task details
        console.log('Task clicked:', task);
    };

    const handleAddTask = (status: any) => {
        // Implement add task functionality
        console.log('Add task to:', status);
    };

    const getTotalTasks = () => allTasks.length;
    const getCompletedTasks = () => allTasks.filter(task => task.status === 'Completed').length;
    const getCompletionRate = () => {
        const total = getTotalTasks();
        const completed = getCompletedTasks();
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    return (
        <div className="bg-gray-50 h-[600px] overflow-y-scroll">
            <div className="max-w-7xl mx-auto p-4 ">
                {/* Header Section */}
                <div className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 relative  shadow-sm">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tasks Dashboard</h1>
                        <div className="text-gray-600 text-sm mb-4">Dashboard • Tasks</div>
                        <div className="flex gap-6 text-sm">
                            <div className="bg-white bg-opacity-50 rounded-lg px-3 py-2">
                                <span className="text-gray-600">Total Tasks:</span>
                                <span className="font-semibold ml-2">{getTotalTasks()}</span>
                            </div>
                            <div className="bg-white bg-opacity-50 rounded-lg px-3 py-2">
                                <span className="text-gray-600">Completed:</span>
                                <span className="font-semibold ml-2">{getCompletedTasks()}</span>
                            </div>
                            <div className="bg-white bg-opacity-50 rounded-lg px-3 py-2">
                                <span className="text-gray-600">Completion Rate:</span>
                                <span className="font-semibold ml-2">{getCompletionRate()}%</span>
                            </div>
                        </div>
                    </div>
                    {taskIcon && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20">
                            <Image src={taskIcon} alt="Tasks illustration" width={120} height={120} />
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-screen overflow-y-auto">
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Kanban Board</h2>
                        <button
                            onClick={() =>
                                setShowAddTask(!showAddTask)
                            }
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-sm"
                        >
                            <Plus size={16} />
                            Add New Task
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-400px)] min-h-96">
                            {columns.map((column) => (
                                <KanbanColumn
                                    key={column.id}
                                    column={column}
                                    tasks={getTasksByStatus(column.id)}
                                    onTaskClick={handleTaskClick}
                                    onAddTask={handleAddTask}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <AddTodos
                isOpen={showAddTask}
                onClose={() => setShowAddTask(false)}
                onSubmit={(newTask) => {
                    // Add the new task to your state
                    // setShowAddTask(prev => [...prev, newTask]);
                }}
                initialStatus="Todo" // Optional: set default status
            />
        </div>
    );
};

export default Tasks;