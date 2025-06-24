import React, { useRef, useEffect } from 'react'
import { Message, Contact } from '@/lib/hooks/useFetchWeTalks'
import { formatDateTime } from '@/utils/dateformat'

interface WeTalkMessagesProps {
  messages: Message[]
  activeContact: Contact | null
  isTyping: boolean
  isLoading: boolean
}

const WeTalkMessages: React.FC<WeTalkMessagesProps> = ({
  messages,
  activeContact,
  isTyping,
  isLoading
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          activeContact={activeContact}
          formatTime={formatTime}
        />
      ))}

      {isTyping && activeContact && (
        <TypingIndicator activeContact={activeContact} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  activeContact: Contact | null
  formatTime: (date: Date) => string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, activeContact, formatTime }) => {
  return (
    <div
      className={`flex items-end space-x-2 animate-fadeIn ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.sender === 'other' && activeContact && (
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${activeContact.gradient} flex items-center justify-center text-sm flex-shrink-0`}>
          {message.avatar || activeContact.avatar}
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
        message.sender === 'user'
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none'
          : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
      }`}>
        {message.sender === 'other' && (
          <p className="text-xs text-gray-500 mb-1 font-medium">{message.senderName}</p>
        )}
        <p className="text-sm leading-relaxed">{message.text}</p>
        <div className={`flex items-center justify-between mt-2 text-xs ${
          message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
        }`}>
          <span>{formatDateTime(message.timestamp)}</span>
          {message.sender === 'user' && (
            <MessageStatus status={message.status} />
          )}
        </div>
      </div>

      {message.sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center text-sm flex-shrink-0 text-white">
          👤
        </div>
      )}
    </div>
  )
}

interface MessageStatusProps {
  status: 'sent' | 'delivered' | 'read'
}

const MessageStatus: React.FC<MessageStatusProps> = ({ status }) => {
  return (
    <div className="flex items-center space-x-1">
      {status === 'sent' && <div className="w-1 h-1 bg-white/70 rounded-full"></div>}
      {status === 'delivered' && <div className="w-1 h-1 bg-white rounded-full"></div>}
      {status === 'read' && <div className="w-1 h-1 bg-blue-300 rounded-full"></div>}
    </div>
  )
}

interface TypingIndicatorProps {
  activeContact: Contact
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ activeContact }) => {
  return (
    <div className="flex items-end space-x-2 animate-fadeIn">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${activeContact.gradient} flex items-center justify-center text-sm`}>
        {activeContact.avatar}
      </div>
      <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-lg border border-gray-100">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  )
}

export default WeTalkMessages 