"use client"

import { Send, Mic, Paperclip, Smile } from "lucide-react"
import type React from "react"
import { useState } from "react"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  currentTheme: {
    color: string
    ring: string
    name: string
    gradient: string
  }
  sidebarState?: "expanded" | "collapsed" | "mini"
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, currentTheme }) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full rounded-l-xl">
      {/* <button
        type="button"
        className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
        aria-label="Attach file"
      >
        <Paperclip size={20} />
      </button> */}

      <div className="relative flex-grow">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={`w-full px-5 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 ${currentTheme.ring} bg-gray-50 pr-10 transition-all duration-300`}
          disabled={isLoading}
        />
        {/* <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </button> */}
      </div>

      {/* <button
        type="button"
        className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
        aria-label="Voice input"
      >
        <Mic size={20} />
      </button> */}

      <button
        type="submit"
        className={`${currentTheme.color} text-white p-3 rounded-full hover:opacity-90 disabled:opacity-50 transition-all duration-300 shadow-md transform hover:scale-105 disabled:hover:scale-100 flex-shrink-0`}
        disabled={isLoading}
        aria-label={isLoading ? "Sending..." : "Send message"}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Send size={20} />
        )}
      </button>
    </form>
  )
}

export default ChatInput
