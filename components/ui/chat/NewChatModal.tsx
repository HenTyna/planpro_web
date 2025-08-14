'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, UserPlus } from 'lucide-react'

interface User {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  email: string
}

interface NewChatModalProps {
  isOpen: boolean
  onClose: () => void
  onStartChat: (userId: string) => void
  isDarkMode: boolean
}

const NewChatModal = ({ isOpen, onClose, onStartChat, isDarkMode }: NewChatModalProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  // Mock users data - in real app this would come from API
  const allUsers: User[] = [
    { id: '1', name: 'John Doe', avatar: 'JD', isOnline: true, email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', avatar: 'JS', isOnline: false, email: 'jane@example.com' },
    { id: '3', name: 'Mike Johnson', avatar: 'MJ', isOnline: true, email: 'mike@example.com' },
    { id: '4', name: 'Sarah Wilson', avatar: 'SW', isOnline: false, email: 'sarah@example.com' },
    { id: '5', name: 'David Brown', avatar: 'DB', isOnline: true, email: 'david@example.com' },
    { id: '6', name: 'Emma Davis', avatar: 'ED', isOnline: false, email: 'emma@example.com' },
    { id: '7', name: 'Alex Turner', avatar: 'AT', isOnline: true, email: 'alex@example.com' },
    { id: '8', name: 'Lisa Anderson', avatar: 'LA', isOnline: false, email: 'lisa@example.com' },
  ]

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUserSelect = (userId: string) => {
    onStartChat(userId)
    onClose()
    setSearchQuery('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`relative w-full max-w-md rounded-2xl shadow-xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            {/* Header */}
            <div className={`p-6 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  New Chat
                </h2>
                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Users List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ backgroundColor: isDarkMode ? '#374151' : '#f3f4f6' }}
                    onClick={() => handleUserSelect(user.id)}
                    className={`p-4 cursor-pointer transition-colors border-b ${
                      isDarkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        {user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium truncate ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {user.name}
                        </h3>
                        <p className={`text-sm truncate ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {user.email}
                        </p>
                      </div>

                      <UserPlus className="w-5 h-5 text-gray-400" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={`p-8 text-center ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm">
                    {searchQuery ? 'No users found' : 'Search for users to start a chat'}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default NewChatModal 