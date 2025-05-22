

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MessageCircle, Bell, Mail, Clock } from "lucide-react"
import { Button } from "@/components/shared/ui/Button"

export default function TelegramSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="telegram" className="bg-gradient-to-b from-gray-50 to-white py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="order-2 md:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-orange-400 opacity-30 blur-xl"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-4 p-2 bg-blue-50 rounded-lg">
                  <MessageCircle className="h-8 w-8 text-blue-500" />
                  <div>
                    <h4 className="font-semibold">PlanPro Bot</h4>
                    <p className="text-sm text-gray-600">Active now</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Good morning! Here are your tasks for today:</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">📌 Finish project proposal (High priority)</p>
                      <p className="text-sm">📌 Team meeting at 2:00 PM</p>
                      <p className="text-sm">📌 Book flight tickets for next week</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-orange-50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">Remind me about the meeting 30 minutes before</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">👤</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">✅ Reminder set for 1:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss a Task with <span className="text-blue-500">Telegram Integration</span>
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Connect your Telegram account to receive timely reminders, updates, and manage your tasks directly from
              your favorite messaging app.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bell className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Instant Notifications</h3>
                  <p className="text-gray-600">
                    Receive real-time alerts for upcoming events, deadlines, and important tasks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Gmail Integration</h3>
                  <p className="text-gray-600">
                    Connect your Gmail account to get email reminders and sync important dates.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Custom Reminder Schedules</h3>
                  <p className="text-gray-600">
                    Set personalized reminder schedules based on your preferences and priorities.
                  </p>
                </div>
              </div>
            </div>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Connect Telegram
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
