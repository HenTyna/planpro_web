import React from 'react'
import { Phone, Video, Heart } from 'lucide-react'
import { Contact } from '@/lib/hooks/useFetchWeTalks'

interface WeTalkHeaderProps {
  activeContact: Contact | null
  isTyping: boolean
  onCallClick: () => void
  onVideoClick: () => void
  onHeartClick: () => void
}

const WeTalkHeader: React.FC<WeTalkHeaderProps> = ({
  activeContact,
  isTyping,
  onCallClick,
  onVideoClick,
  onHeartClick
}) => {
  if (!activeContact) {
    return (
      <div className="bg-white/90 backdrop-blur-sm border-b border-white/50 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-center">
          <p className="text-gray-500">Select a contact to start chatting</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-white/50 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${activeContact.gradient} flex items-center justify-center text-xl shadow-lg`}>
              {activeContact.avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h2 className="font-bold text-gray-900">{activeContact.name}</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-600 font-medium">Online</span>
              {isTyping && (
                <>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-purple-600 animate-pulse">typing...</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onCallClick}
            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button 
            onClick={onVideoClick}
            className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Video className="w-5 h-5" />
          </button>
          <button 
            onClick={onHeartClick}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeTalkHeader 