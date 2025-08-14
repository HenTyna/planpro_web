'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatList from './ChatList'
import ChatConversation from './ChatConversation'
import ChatProfile from './ChatProfile'
import NewChatModal from './NewChatModal'

interface Chat {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount?: number
  avatar: string
  isOnline: boolean
  bio?: string
  phone?: string
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: Date
  reactions?: string[]
  hasAttachment?: boolean
  attachmentType?: 'image' | 'file' | 'voice'
  attachmentUrl?: string
  attachmentName?: string
  attachmentSize?: string
}

const ChatContainer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selectedChatId, setSelectedChatId] = useState<string>('')
  const [showProfile, setShowProfile] = useState(false)
  const [showNewChatModal, setShowNewChatModal] = useState(false)
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Yong Tonghyon',
      lastMessage: 'Let me know if it works or not?',
      timestamp: '11:32 AM',
      unreadCount: 2,
      avatar: 'YT',
      isOnline: true,
      bio: 'Life is mirror, smile at it 😊',
      phone: '6462662535'
    },
    {
      id: '2',
      name: 'Sarah Miller',
      lastMessage: 'Perfect! I\'ll prepare the next phase then.',
      timestamp: 'Yesterday',
      unreadCount: 3,
      avatar: 'SM',
      isOnline: false
    },
    {
      id: '3',
      name: 'David Chen',
      lastMessage: 'Thanks for the update!',
      timestamp: 'Monday',
      unreadCount: 1,
      avatar: 'DC',
      isOnline: true
    },
    {
      id: '4',
      name: 'Emma Thompson',
      lastMessage: 'Wait. I\'m looking into it!',
      timestamp: '2 hours ago',
      avatar: 'ET',
      isOnline: false
    },
    {
      id: '5',
      name: 'Jelena Denisova',
      lastMessage: 'I checked it. Yep, that works!',
      timestamp: '1 hour ago',
      avatar: 'JD',
      isOnline: true,
      bio: 'Life is mirror, smile at it 😊',
      phone: '6462662535'
    }
  ])

  const [messages, setMessages] = useState<{ [chatId: string]: Message[] }>({
    '1': [
      {
        id: '1',
        text: 'Hey! How are you doing today? 😊',
        sender: 'other',
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: '2',
        text: 'I\'m doing great! Just working on some exciting new features.',
        sender: 'user',
        timestamp: new Date(Date.now() - 240000)
      },
      {
        id: '3',
        text: 'That sounds amazing! Can\'t wait to see what you\'ve built.',
        sender: 'other',
        timestamp: new Date(Date.now() - 180000)
      }
    ],
    '5': [
      {
        id: '1',
        text: 'Let me know if it works or not?',
        sender: 'other',
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: '2',
        text: 'Wait. I\'m looking into it!',
        sender: 'user',
        timestamp: new Date(Date.now() - 1800000)
      },
      {
        id: '3',
        text: 'I checked it. Yep, that works!',
        sender: 'user',
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: '4',
        text: 'Perfect! I\'ll prepare the next phase then.',
        sender: 'other',
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: '5',
        text: 'CryptoCoin-Release.pdf',
        sender: 'other',
        timestamp: new Date(Date.now() - 120000),
        hasAttachment: true,
        attachmentType: 'file',
        attachmentName: 'CryptoCoin-Release.pdf',
        attachmentSize: '12 mb'
      }
    ]
  })

  const selectedChat = chats.find(chat => chat.id === selectedChatId) || null
  const currentMessages = messages[selectedChatId] || []

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId)
    setShowProfile(true)
  }

  const handleNewChat = () => {
    setShowNewChatModal(true)
  }

  const handleStartChat = (userId: string) => {
    // In a real app, this would create a new chat with the selected user
    // For now, we'll just select an existing chat
    const newChat = chats.find(chat => chat.id === userId)
    if (newChat) {
      setSelectedChatId(userId)
      setShowProfile(true)
    }
  }

  const handleSendMessage = (text: string) => {
    if (!selectedChatId) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }))

    // Update last message in chat list
    setChats(prev => prev.map(chat => 
      chat.id === selectedChatId 
        ? { ...chat, lastMessage: text, timestamp: 'Just now' }
        : chat
    ))

    // Simulate response after 2 seconds
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I\'ll get back to you soon. 🚀',
        sender: 'other',
        timestamp: new Date()
      }

      setMessages(prev => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), response]
      }))
    }, 2000)
  }

  const handleSendFile = (file: File) => {
    if (!selectedChatId) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: `Sent: ${file.name}`,
      sender: 'user',
      timestamp: new Date(),
      hasAttachment: true,
      attachmentType: file.type.startsWith('image/') ? 'image' : 'file',
      attachmentUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      attachmentName: file.name,
      attachmentSize: `${(file.size / (1024 * 1024)).toFixed(1)} mb`
    }

    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }))

    // Update last message in chat list
    setChats(prev => prev.map(chat => 
      chat.id === selectedChatId 
        ? { ...chat, lastMessage: `Sent: ${file.name}`, timestamp: 'Just now' }
        : chat
    ))
  }

  return (
    <div className={`h-screen flex transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Left Column - Chat List */}
      <ChatList
        chats={chats}
        selectedChatId={selectedChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Center Column - Chat Conversation */}
      <ChatConversation
        selectedChat={selectedChat}
        messages={currentMessages}
        onSendMessage={handleSendMessage}
        onSendFile={handleSendFile}
        isDarkMode={isDarkMode}
      />

      {/* Right Column - Chat Profile */}
      <AnimatePresence>
        {showProfile && selectedChat && (
          <ChatProfile
            selectedChat={selectedChat}
            onClose={() => setShowProfile(false)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      {/* New Chat Modal */}
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => setShowNewChatModal(false)}
        onStartChat={handleStartChat}
        isDarkMode={isDarkMode}
      />
    </div>
  )
}

export default ChatContainer