'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X, Volume2, VolumeX, Clock } from 'lucide-react'

interface ChatProfileProps {
  selectedChat: {
    id: string
    name: string
    avatar: string
    isOnline: boolean
    bio?: string
    phone?: string
  } | null
  onClose: () => void
  isDarkMode: boolean
}

const ChatProfile = ({ selectedChat, onClose, isDarkMode }: ChatProfileProps) => {
  const [isMuted, setIsMuted] = React.useState(false)
  const [disappearingMessages, setDisappearingMessages] = React.useState(false)

  if (!selectedChat) {
    return null
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className={`w-80 border-l ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      {/* Header */}
      <div className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Profile
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
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-6">
        {/* Profile Picture */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
              {selectedChat.avatar}
            </div>
            {selectedChat.isOnline && (
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
            )}
          </div>
          <h3 className={`text-xl font-semibold mb-1 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {selectedChat.name}
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Last seen recently
          </p>
        </div>

        {/* Bio */}
        {selectedChat.bio && (
          <div>
            <h4 className={`text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Bio
            </h4>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {selectedChat.bio}
            </p>
          </div>
        )}

        {/* Contact Info */}
        {selectedChat.phone && (
          <div>
            <h4 className={`text-sm font-medium mb-2 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Mobile
            </h4>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {selectedChat.phone}
            </p>
          </div>
        )}

        {/* Settings */}
        <div className="space-y-4">
          <h4 className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Settings
          </h4>
          
          {/* Mute Chat */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-gray-500" />
              ) : (
                <Volume2 className="w-5 h-5 text-gray-500" />
              )}
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Mute Chat
              </span>
            </div>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isMuted 
                  ? 'bg-blue-500' 
                  : isDarkMode 
                    ? 'bg-gray-600' 
                    : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isMuted ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Disappearing Messages */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Disappearing Messages
              </span>
            </div>
            <button
              onClick={() => setDisappearingMessages(!disappearingMessages)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                disappearingMessages 
                  ? 'bg-blue-500' 
                  : isDarkMode 
                    ? 'bg-gray-600' 
                    : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  disappearingMessages ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Media Section */}
        <div>
          <h4 className={`text-sm font-medium mb-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Media, Links and Docs
          </h4>
          <div className={`p-4 rounded-lg border-2 border-dashed ${
            isDarkMode 
              ? 'border-gray-600 text-gray-400' 
              : 'border-gray-300 text-gray-500'
          }`}>
            <p className="text-sm text-center">
              No media shared yet
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ChatProfile 