import React from 'react'
import { Search, Settings, Users, Star, Plus, Sparkles, MessageCircle } from 'lucide-react'
import { Contact } from '@/lib/hooks/useFetchWeTalks'

interface WeTalkSidebarProps {
  contacts: Contact[]
  activeContact: Contact | null
  onContactSelect: (contact: Contact) => void
  onNewChat: () => void
  isLoading: boolean
}

const WeTalkSidebar: React.FC<WeTalkSidebarProps> = ({
  contacts,
  activeContact,
  onContactSelect,
  onNewChat,
  isLoading
}) => {
  const onlineCount = contacts.filter(contact => contact.status === 'online').length
  const starredCount = contacts.filter(contact => contact.unreadCount > 0).length

  return (
    <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-white/50 shadow-xl relative z-10">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <MessageCircle className="w-8 h-8 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold">WeTalk</h1>
                <p className="text-white/80 text-sm">Connect & Share</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{onlineCount} online</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{starredCount} starred</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isActive={activeContact?.id === contact.id}
              onClick={() => onContactSelect(contact)}
            />
          ))
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button 
          onClick={onNewChat}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Chat</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

interface ContactItemProps {
  contact: Contact
  isActive: boolean
  onClick: () => void
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center space-x-3 p-4 mx-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 ${
        isActive ? 'bg-gradient-to-r from-purple-100 to-pink-100 shadow-md' : ''
      }`}
    >
      <div className="relative">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${contact.gradient} flex items-center justify-center text-xl shadow-lg`}>
          {contact.avatar}
        </div>
        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
          contact.status === 'online' ? 'bg-green-400' : 
          contact.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
        }`}></div>
        {contact.unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">
            {contact.unreadCount}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 truncate">{contact.name}</h3>
          <span className="text-xs text-gray-500">2m</span>
        </div>
        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
        {contact.isTyping && (
          <div className="flex items-center space-x-1 mt-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce animation-delay-200"></div>
              <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce animation-delay-400"></div>
            </div>
            <span className="text-xs text-purple-500">typing...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeTalkSidebar 