

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { NotebookPen, CheckSquare, ImageIcon, Tag, Clock } from "lucide-react"
import { Button } from "@/components/shared/ui/Button"

export default function NotesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Capture Ideas with <span className="text-blue-500">Smart Notes</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Create rich notes and todo lists that sync across all your devices. Add images, checklists, and tags to
              stay organized.
            </p>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <NotebookPen className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Rich Text Formatting</h3>
                  <p className="text-gray-600">Format your notes with headings, lists, code blocks, and more.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckSquare className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Todo Lists</h3>
                  <p className="text-gray-600">
                    Create interactive todo lists with checkboxes, priorities, and due dates.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <ImageIcon className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Image Attachments</h3>
                  <p className="text-gray-600">
                    Add images and files to your notes for visual reference and documentation.
                  </p>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Try Notes
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <NotebookPen className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">My Notes</h3>
                </div>
                <Button variant="outline" size="sm">
                  + New Note
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="col-span-2 bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-blue-700">Project Ideas</h4>
                    <div className="flex gap-1">
                      <Tag className="h-4 w-4 text-blue-500" />
                      <Clock className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">
                    Brainstorming session for upcoming projects and feature ideas.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-blue-400 bg-white flex items-center justify-center">
                        <CheckSquare className="h-3 w-3 text-blue-500" />
                      </div>
                      <span className="text-sm text-blue-700 line-through">Research competitors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-blue-400 bg-white"></div>
                      <span className="text-sm text-blue-700">Create wireframes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-blue-400 bg-white"></div>
                      <span className="text-sm text-blue-700">Schedule team meeting</span>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                  <h4 className="font-semibold text-yellow-700 mb-2">Shopping List</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-yellow-400 bg-white flex items-center justify-center">
                        <CheckSquare className="h-3 w-3 text-yellow-500" />
                      </div>
                      <span className="text-sm text-yellow-700 line-through">Groceries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded border border-yellow-400 bg-white"></div>
                      <span className="text-sm text-yellow-700">Office supplies</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h4 className="font-semibold text-green-700 mb-2">Meeting Notes</h4>
                  <p className="text-sm text-green-700">
                    Key points from client meeting on June 10th. Follow-up required.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
