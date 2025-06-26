import React, { useState } from 'react'
import { Search, Settings, Users, Star, Plus, MessageCircle, ChevronDown, UserPlus, AlertCircle, RefreshCw } from 'lucide-react'
import { Contact, MyContact } from '@/lib/types/weTalk.types'
import { formatHHmmss } from '@/utils/dateformat'

interface WeTalkSidebarProps {
  contacts: Contact[]
  myContacts: MyContact[]
  activeContact: MyContact | null
  onContactSelect: (contact: MyContact) => void
  onShowUserSelection: () => void
  onShowGroupCreator: () => void
  isLoading: boolean
  hasError?: boolean
  onRetry?: () => void
}

const WeTalkSidebar: React.FC<WeTalkSidebarProps> = ({
  contacts,
  myContacts,
  activeContact,
  onContactSelect,
  onShowUserSelection,
  onShowGroupCreator,
  isLoading,
  hasError = false,
  onRetry
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showChatMenu, setShowChatMenu] = useState(false)
  
  const onlineCount = myContacts.filter(contact => contact.status === 'online').length
  const starredCount = myContacts.filter(contact => contact.unreadCount > 0).length

  // Filter contacts based on search term
  const filteredContacts = myContacts.filter(contact =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase())
  )
  console.log(contacts)

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
                <h1 className="text-xl font-bold">WeTalk Users</h1>
                <p className="text-white/80 text-sm">Previous Conversations</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative">
                <button 
                  onClick={() => setShowChatMenu(!showChatMenu)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  title="Start new chat"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Chat</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                
                {/* Chat Menu Dropdown */}
                {showChatMenu && (
                  <div className="cursor-pointer absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[180px] z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowUserSelection()
                        setShowChatMenu(false)
                      }}
                      className="cursor-pointer w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-purple-500" />
                      <span className="cursor-pointer">Message User</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onShowGroupCreator()
                        setShowChatMenu(false)
                      }}
                      className="cursor-pointer w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <UserPlus className="w-4 h-4 text-green-500" />
                      <span className="cursor-pointer">Create Group</span>
                    </button>
                  </div>
                )}
              </div>
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
              <span>{starredCount} unread</span>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Error State */}
      {hasError && (
        <div className="mx-4 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-700">Failed to load contacts</p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center space-x-1 px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-red-700 text-xs transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {filteredContacts.length > 0 ? (
              <div className="space-y-1">
                {filteredContacts.map((contact) => (
                  <ContactItem
                    key={contact.userId}
                    contact={contact}
                    isActive={activeContact?.userId === contact.userId}
                    onClick={() => onContactSelect(contact)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-500 mb-2">
                  {searchTerm ? 'No conversations found' : 'No conversations yet'}
                </h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Start a new conversation with someone!'
                  }
                </p>
                {!searchTerm && (
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={onShowUserSelection}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Find Users
                    </button>
                    <button 
                      onClick={onShowGroupCreator}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
                    >
                      Create Group
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {showChatMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowChatMenu(false)}
        />
      )}
    </div>
  )
}

interface ContactItemProps {
  contact: MyContact
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
          {contact.avatarUrl}
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
          <h3 className="font-semibold text-gray-900 truncate">{contact.username}</h3>
          <span className="text-xs text-gray-500">{formatHHmmss(contact.lastMessageTime)}</span>
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