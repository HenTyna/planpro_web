import React from 'react'
import useFetchWeTalks from '@/lib/hooks/useFetchWeTalks'
import WeTalkBackground from './WeTalkBackground'
import WeTalkSidebar from './WeTalkSidebar'
import WeTalkHeader from './WeTalkHeader'
import WeTalkMessages from './WeTalkMessages'
import WeTalkInput from './WeTalkInput'

const WeTalkContainer = () => {
  const {
    contacts,
    messages,
    activeContact,
    isLoading,
    isTyping,
    error,
    sendMessage,
    switchContact,
    createConversation
  } = useFetchWeTalks()

  const handleSendMessage = (text: string) => {
    sendMessage(text)
  }

  const handleContactSelect = (contact: any) => {
    switchContact(contact)
  }

  const handleNewChat = async () => {
    // This could open a modal to select participants
    // For now, we'll just show a message
    alert('New Chat feature - select participants to create a new conversation')
  }

  const handleCallClick = () => {
    if (activeContact) {
      alert(`Starting voice call with ${activeContact.name}`)
    }
  }

  const handleVideoClick = () => {
    if (activeContact) {
      alert(`Starting video call with ${activeContact.name}`)
    }
  }

  const handleHeartClick = () => {
    if (activeContact) {
      alert(`Sending love to ${activeContact.name} 💝`)
    }
  }

  if (error) {
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex">
      <WeTalkBackground />
      
      <WeTalkSidebar
        contacts={contacts}
        activeContact={activeContact}
        onContactSelect={handleContactSelect}
        onNewChat={handleNewChat}
        isLoading={isLoading}
      />

      <div className="flex-1 flex flex-col relative z-10">
        <WeTalkHeader
          activeContact={activeContact}
          isTyping={isTyping}
          onCallClick={handleCallClick}
          onVideoClick={handleVideoClick}
          onHeartClick={handleHeartClick}
        />

        <WeTalkMessages
          messages={messages}
          activeContact={activeContact}
          isTyping={isTyping}
          isLoading={isLoading}
        />

        <WeTalkInput
          onSendMessage={handleSendMessage}
          disabled={!activeContact || isLoading}
        />
      </div>
    </div>
  )
}

export default WeTalkContainer