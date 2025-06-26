import React, { useState } from 'react'
import { X, MessageCircle, Search, Users, AlertCircle, RefreshCw } from 'lucide-react'
import { Contact } from '@/lib/types/weTalk.types'

interface UserSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  allUsers: Contact[]
  onStartConversation: (user: Contact) => void
  isLoading: boolean
  error?: string
  onRetry?: () => void
}

const UserSelectionPopup: React.FC<UserSelectionPopupProps> = ({
  isOpen,
  onClose,
  allUsers,
  onStartConversation,
  isLoading,
  error,
  onRetry
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  if (!isOpen) return null

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onlineUsers = filteredUsers.filter(user => user.status === 'online')
  const offlineUsers = filteredUsers.filter(user => user.status !== 'online')

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">PlanPro Users</h2>
                <p className="text-gray-500 text-sm">Select a user to start a conversation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-800">Failed to load users</h4>
                <p className="text-sm text-red-600 mt-1">{error}</p>
              </div>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center space-x-2 px-3 py-2 bg-red-100 hover:bg-red-200 rounded text-red-700 text-sm transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading users...</p>
              </div>
            </div>
          ) : error && allUsers.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Unable to load users</h3>
                <p className="text-gray-500 mb-4">Please check your connection and try again</p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Online Users */}
              {onlineUsers.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold text-gray-900">Online ({onlineUsers.length})</h3>
                  </div>
                  <div className="space-y-2">
                    {onlineUsers.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        onStartConversation={onStartConversation}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Offline Users */}
              {offlineUsers.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <h3 className="font-semibold text-gray-900">Offline ({offlineUsers.length})</h3>
                  </div>
                  <div className="space-y-2">
                    {offlineUsers.map((user) => (
                      <UserItem
                        key={user.id}
                        user={user}
                        onStartConversation={onStartConversation}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredUsers.length === 0 && !isLoading && !error && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-500 mb-2">No users found</h3>
                  <p className="text-gray-400">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface UserItemProps {
  user: Contact
  onStartConversation: (user: Contact) => void
  disabled?: boolean
}

const UserItem: React.FC<UserItemProps> = ({ user, onStartConversation, disabled = false }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${user.gradient} flex items-center justify-center text-xl shadow-lg`}>
            {user.avatar}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            user.status === 'online' ? 'bg-green-400' : 
            user.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
          }`}></div>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{user.name}</h4>
          <p className="text-sm text-gray-500 capitalize">{user.status}</p>
        </div>
      </div>
      <button
        onClick={() => onStartConversation(user)}
        disabled={disabled}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all shadow-lg transform ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105'
        }`}
      >
        <MessageCircle className="w-4 h-4" />
        <span>{disabled ? 'Starting...' : 'Message'}</span>
      </button>
    </div>
  )
}

export default UserSelectionPopup 