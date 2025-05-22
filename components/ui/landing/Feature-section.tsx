

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { CalendarDays, CheckSquare, MessageCircle, NotebookPen, PlaneLanding } from "lucide-react"

const features = [
  {
    icon: <CalendarDays className="h-10 w-10 text-blue-500" />,
    title: "Smart Planning",
    description: "Create detailed plans with reminders, deadlines, and priorities to stay organized.",
    color: "bg-blue-500",
    ring: "ring-blue-500",
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-orange-400" />,
    title: "Telegram Bot Integration",
    description: "Receive reminders and updates directly through Telegram with our custom bot.",
    color: "bg-orange-400",
    ring: "ring-orange-400",
  },
  {
    icon: <PlaneLanding className="h-10 w-10 text-yellow-400" />,
    title: "Trip Planning",
    description: "Plan your trips with interactive maps, itineraries, and location-based reminders.",
    color: "bg-yellow-400",
    ring: "ring-yellow-400",
  },
  {
    icon: <CheckSquare className="h-10 w-10 text-green-400" />,
    title: "Task Kanban",
    description: "Visualize your workflow with customizable Kanban boards for tasks and projects.",
    color: "bg-green-400",
    ring: "ring-green-400",
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-teal-400" />,
    title: "Calendar Sync",
    description: "Sync with Google Calendar to manage all your events in one place with color coding.",
    color: "bg-teal-400",
    ring: "ring-teal-400",
  },
  {
    icon: <NotebookPen className="h-10 w-10 text-blue-500" />,
    title: "Notes & Todo Lists",
    description: "Create rich notes and todo lists that sync across all your devices.",
    color: "bg-blue-500",
    ring: "ring-blue-500",
  },
]

export default function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="features" className="container mx-auto px-4 py-20" ref={ref}>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">All the tools you need in one place</h2>
        <p className="text-xl text-gray-600">
          PlanPro combines planning, reminders, task management, and more into one seamless experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div
              className={`w-16 h-16 rounded-lg ${feature.color} bg-opacity-10 flex items-center justify-center mb-4`}
            >
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
