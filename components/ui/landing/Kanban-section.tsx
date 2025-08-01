

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { CheckSquare, Clock, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/shared/ui/Button"
import todos from "@/public/asset/todo.jpg"
import progress from "@/public/asset/progress.jpg"
import done from "@/public/asset/done.jpg"

const kanbanColumns = [
  {
    title: "To Do",
    color: "bg-blue-500",
    cards: [
      {
        title: "Research competitors",
        tags: ["Marketing", "Research"],
        dueDate: "Jun 15",
        image: todos,
      },
      {
        title: "Update documentation",
        tags: ["Development"],
        dueDate: "Jun 18",
      },
    ],
  },
  {
    title: "In Progress",
    color: "bg-yellow-400",
    cards: [
      {
        title: "Design new landing page",
        tags: ["Design", "Website"],
        dueDate: "Jun 14",
        image: progress,
      },
    ],
  },
  {
    title: "Done",
    color: "bg-green-400",
    cards: [
      {
        title: "Fix navigation bug",
        tags: ["Development", "Bug"],
        dueDate: "Jun 10",
        image: done,
      },
    ],
  },
]

export default function KanbanSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="tasks" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Visualize Your Workflow with <span className="text-green-400">Task Kanban</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Organize tasks into customizable boards with our intuitive drag-and-drop Kanban system. Add images, tags,
              and due dates to keep everything on track.
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Visual Task Cards</h3>
                  <p className="text-gray-600">
                    Create rich task cards with images, descriptions, checklists, and attachments.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Deadline Tracking</h3>
                  <p className="text-gray-600">
                    Set and track deadlines with visual indicators for approaching due dates.
                  </p>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-green-400 hover:bg-green-500">
              Try Kanban Board
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Project Tasks</h3>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add Column
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {kanbanColumns.map((column, colIndex) => (
                  <div key={colIndex} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                        <h4 className="font-medium">{column.title}</h4>
                      </div>
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      {column.cards.map((card, cardIndex) => (
                        <div
                          key={cardIndex}
                          className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                        >
                          {card.image && (
                            <div className="mb-2 rounded-md overflow-hidden">
                              <Image
                                src={card.image}
                                alt="Task attachment"
                                width={220}
                                height={80}
                                className="w-full h-30 object-cover"
                                unoptimized
                              />
                            </div>
                          )}
                          <h5 className="font-medium mb-2">{card.title}</h5>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {card.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {card.dueDate}
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="ghost" size="sm" className="w-full text-gray-500 justify-start">
                        <Plus className="h-4 w-4 mr-1" /> Add Card
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
