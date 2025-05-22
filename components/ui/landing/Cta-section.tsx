

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Input } from "@/components/shared/ui/Input"
import { Button } from "@/components/shared/ui/Button"


export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">Transform</span>{" "}
            Your Productivity?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have already improved their planning and organization with PlanPro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <Input type="email" placeholder="Enter your email" className="h-12" />
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 h-12 w-[300px]">
              Get Started Free
            </Button>
          </div>
          <p className="text-sm text-gray-500">No credit card required. Free 14-day trial.</p>
        </motion.div>
      </div>
    </section>
  )
}
