import Link from "next/link"
import { CalendarDays, CheckSquare, MessageCircle, Sparkles } from "lucide-react"
import { Path } from "@/utils/enum"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                PlanPro
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-xs">
              The all-in-one productivity solution for planning, reminders, and task management.
            </p>
            <div className="flex gap-4">
              {/* <Link href="#" className="text-gray-400 hover:text-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link> */}
              {/* <Link href="#" className="text-gray-400 hover:text-blue-500">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link> */}
              <Link href={Path.MY_TELEGRAM} className="text-gray-400 hover:text-blue-500" target="_blank">
                <img width="25" height="25" src="https://img.icons8.com/ios/50/telegram.png" alt="telegram" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Planning</span>
                </Link>
              </li>
              <li>
                <Link href="#telegram" className="text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Telegram Bot</span>
                </Link>
              </li>
              <li>
                <Link href="#calendar" className="text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Calendar</span>
                </Link>
              </li>
              <li>
                <Link href="#tasks" className="text-gray-600 hover:text-blue-500 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4" />
                  <span>Tasks</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-blue-500">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PlanPro. All rights reserved. | Developed by Mr. Hen Ty
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-blue-500 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-blue-500 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 hover:text-blue-500 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
