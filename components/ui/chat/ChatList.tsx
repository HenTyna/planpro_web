'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Sun, Moon } from 'lucide-react'

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  avatar: string
  isOnline: boolean
}

interface ChatListProps {
  chats: Chat[]
  selectedChatId: string
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
  isDarkMode: boolean
  onThemeToggle: () => void
}

const ChatList = ({ 
  chats, 
  selectedChatId, 
  onChatSelect, 
  onNewChat, 
  isDarkMode, 
  onThemeToggle 
}: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className={`w-80 border-r ${
      isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Chats
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={onNewChat}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-[calc(100vh-120px)]">
        <AnimatePresence>
          {filteredChats.map((chat) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#f3f4f6' }}
              onClick={() => onChatSelect(chat.id)}
              className={`p-4 cursor-pointer transition-colors ${
                selectedChatId === chat.id
                  ? isDarkMode ? 'bg-purple-900/20' : 'bg-purple-100'
                  : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {chat.avatar}
                  </div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium truncate ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {chat.name}
                    </h3>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className={`text-sm truncate ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unreadCount && chat.unreadCount > 0 && (
                  <div className="w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unreadCount}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
      </div>
    </div>
  )
}

export default ChatList 