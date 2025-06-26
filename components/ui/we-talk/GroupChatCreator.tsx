import React, { useState } from 'react'
import { X, Users, Check, Search, AlertCircle, RefreshCw } from 'lucide-react'
import { Contact } from '@/lib/types/weTalk.types'

interface GroupChatCreatorProps {
  isOpen: boolean
  onClose: () => void
  allUsers: Contact[]
  onCreateGroup: (memberIds: number[], groupName: string) => void
  isLoading: boolean
  error?: string
  onRetry?: () => void
}

const GroupChatCreator: React.FC<GroupChatCreatorProps> = ({
  isOpen,
  onClose,
  allUsers,
  onCreateGroup,
  isLoading,
  error,
  onRetry
}) => {
  const [groupName, setGroupName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  if (!isOpen) return null

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserToggle = (user: Contact) => {
    if (isLoading) return
    
    setSelectedUsers(prev => {
      const isSelected = prev.some(u => u.id === user.id)
      if (isSelected) {
        return prev.filter(u => u.id !== user.id)
      } else {
        return [...prev, user]
      }
    })
  }

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedUsers.length === 0 || isLoading) return
    
    const memberIds = selectedUsers.map(user => user.userId!).filter(id => id)
    onCreateGroup(memberIds, groupName.trim())
    
    // Reset form
    setGroupName('')
    setSelectedUsers([])
    setSearchTerm('')
  }

  const handleClose = () => {
    setGroupName('')
    setSelectedUsers([])
    setSearchTerm('')
    onClose()
  }

  const canCreateGroup = groupName.trim() && selectedUsers.length > 0 && !isLoading

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Create Group Chat</h2>
                <p className="text-gray-500 text-sm">Select members and give your group a name</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Group Name Input */}
        <div className="p-6 border-b border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group Name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name..."
            disabled={isLoading}
            className={`w-full px-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
              isLoading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-50 focus:bg-white'
            }`}
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1">{groupName.length}/50 characters</p>
        </div>

        {/* Selected Users Display */}
        {selectedUsers.length > 0 && (
          <div className="p-6 border-b border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selected Members ({selectedUsers.length})
            </label>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm"
                >
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${user.gradient} flex items-center justify-center text-xs`}>
                    {user.avatar}
                  </div>
                  <span>{user.name}</span>
                  <button
                    onClick={() => handleUserToggle(user)}
                    disabled={isLoading}
                    className={`ml-1 rounded-full p-1 ${
                      isLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'hover:bg-green-200'
                    }`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* User Search */}
        <div className="p-6 border-b border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Members
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
              className={`w-full pl-10 pr-4 py-3 border-0 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
                isLoading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-50 focus:bg-white'
              }`}
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mx-6 p-4 bg-red-50 border border-red-200 rounded-lg">
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
          {isLoading && allUsers.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
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
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredUsers.map((user) => {
                const isSelected = selectedUsers.some(u => u.id === user.id)
                return (
                  <div
                    key={user.id}
                    onClick={() => handleUserToggle(user)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      isLoading 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'cursor-pointer'
                    } ${
                      isSelected
                        ? 'bg-green-50 border-2 border-green-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
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
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isSelected
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                )
              })}

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

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {selectedUsers.length > 0 && (
                <span>{selectedUsers.length} member{selectedUsers.length !== 1 ? 's' : ''} selected</span>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isLoading 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup}
                disabled={!canCreateGroup}
                className={`px-6 py-2 rounded-lg transition-all ${
                  canCreateGroup
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </div>
                ) : (
                  'Create Group'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupChatCreator 