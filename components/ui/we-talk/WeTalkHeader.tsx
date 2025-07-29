import React from 'react'
import { Phone, Video, Heart, Wifi, WifiOff, AlertCircle } from 'lucide-react'
import { Contact, MyContact } from '@/lib/types/weTalk.types'

interface WeTalkHeaderProps {
  activeContact: MyContact | null
  isTyping: boolean
  onCallClick: () => void
  onVideoClick: () => void
  onHeartClick: () => void
  isWebSocketConnected?: boolean
  wsConnectionError?: string | null
}

const WeTalkHeader: React.FC<WeTalkHeaderProps> = ({
  activeContact,
  isTyping,
  onCallClick,
  onVideoClick,
  onHeartClick,
  isWebSocketConnected = false,
  wsConnectionError = null
}) => {
  if (!activeContact) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border-b border-white/50 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Select a conversation</h2>
            <p className="text-gray-500">Choose someone to start chatting</p>
          </div>
          <div className="flex items-center space-x-2">
            {wsConnectionError ? (
              <div className="flex items-center space-x-1 text-red-600" title={wsConnectionError}>
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Connection Error</span>
              </div>
            ) : isWebSocketConnected ? (
              <div className="flex items-center space-x-1 text-green-600">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">Live</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-orange-600">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm">Offline</span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-white/50 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${activeContact.gradient} flex items-center justify-center text-xl shadow-lg`}>
              {activeContact.avatarUrl}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              activeContact.status === 'online' ? 'bg-green-400' : 
              activeContact.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
            }`}></div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{activeContact.username}</h2>
            <p className={`text-sm ${isTyping ? 'text-purple-500 animate-pulse' : 'text-gray-500'}`}>
              {isTyping ? 'Typing...' : `${activeContact.status.charAt(0).toUpperCase() + activeContact.status.slice(1)}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* WebSocket Status */}
          {wsConnectionError ? (
            <div className="flex items-center space-x-1 text-red-600" title={wsConnectionError}>
              <AlertCircle className="w-4 h-4" />
              <span className="text-xs">Error</span>
            </div>
          ) : isWebSocketConnected ? (
            <div className="flex items-center space-x-1 text-green-600">
              <Wifi className="w-4 h-4" />
              <span className="text-xs">Live</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-orange-600">
              <WifiOff className="w-4 h-4" />
              <span className="text-xs">Offline</span>
            </div>
          )}
          
          {/* Action Buttons */}
          <button
            onClick={onCallClick}
            className="p-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
          </button>
          
          <button
            onClick={onVideoClick}
            className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Video className="w-5 h-5" />
          </button>
          
          <button
            onClick={onHeartClick}
            className="p-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeTalkHeader 