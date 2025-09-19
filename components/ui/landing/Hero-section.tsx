import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/shared/ui/Button"
import PlanProPic from "@/public/asset/landingPic1.jpg"
import { Path } from "@/utils/enum"
import Link from "next/link"
export default function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            All-in-one productivity solution
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Plan, Organize, and{" "}
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Achieve More
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-lg">
            Seamlessly manage your tasks, trips, and reminders with Telegram integration, calendar syncing, and powerful
            planning tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link href={Path.REGISTER}>
                Get Started for Free
              </Link>
            </Button>
            {/* <Button size="lg" variant="outline">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button> */}
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src={`/asset/profile.jpg?height=32&width=32`}
                    alt={`User ${i}`}
                    width={32}
                    height={32}
                    className="bg-gray-200"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">5,000+</span> users already planning smarter
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 opacity-30 blur-xl"></div>
          <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            <Image
              src={PlanProPic}
              alt="PlanPro Dashboard"
              width={800}
              height={600}
              className="w-full h-auto"
              unoptimized
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-70 blur-xl"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-400 rounded-full opacity-70 blur-xl"></div>
        </motion.div>
      </div>
    </section>
  )
}
