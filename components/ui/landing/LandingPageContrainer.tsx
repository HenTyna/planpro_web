import Link from "next/link"
import { Sparkles } from "lucide-react"
import HeroSection from "./Hero-section"
import FeatureSection from "./Feature-section"
import TelegramSection from "./Telegram-section"
import CalendarSection from "./Calendar-section"
import KanbanSection from "./Kanban-section"
import TripSection from "./Trip-section"
import NotesSection from "./Note-section"
import CTASection from "./Cta-section"
import Footer from "./Footer"
import { Button } from "@/components/shared/ui/Button"
import { Path } from "@/utils/enum"


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-blue-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            PlanPro
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">
            Features
          </Link>
          <Link href="#telegram" className="text-gray-600 hover:text-blue-500 transition-colors">
            Telegram Bot
          </Link>
          <Link href="#calendar" className="text-gray-600 hover:text-blue-500 transition-colors">
            Calendar
          </Link>
          <Link href="#tasks" className="text-gray-600 hover:text-blue-500 transition-colors">
            Tasks
          </Link>
          <Link href="#trips" className="text-gray-600 hover:text-blue-500 transition-colors">
            Trips
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href={Path.LOGIN}>
            <Button variant="outline" className="hidden sm:inline-flex">
              Log in
            </Button>
          </Link>
          <Link href={Path.REGISTER}>
            <Button className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
          </Link>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeatureSection />
        <TelegramSection />
        <CalendarSection />
        <KanbanSection />
        <TripSection />
        <NotesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
