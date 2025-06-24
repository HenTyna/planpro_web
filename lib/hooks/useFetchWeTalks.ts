import { useState, useEffect, useCallback } from 'react'
import { useWeTalk } from '@/service/weTalk.service'

export interface Message {
  id: string
  text: string
  sender: 'user' | 'other'
  timestamp: Date
  type: 'text' | 'image' | 'voice'
  status: 'sent' | 'delivered' | 'read'
  avatar?: string
  senderName?: string
  conversationId?: string
  userId?: number
}

export interface Contact {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  lastMessage: string
  unreadCount: number
  isTyping?: boolean
  gradient: string
  userId?: number
}

export interface Conversation {
  id: string
  participants: Contact[]
  lastMessage?: Message
  updatedAt: Date
  unreadCount: number
}

const useFetchWeTalks = () => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [activeContact, setActiveContact] = useState<Contact | null>(null)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    getAllUser,
    getUserConversation,
    getMessages,
    postMessage,
    createWeTalkConversation,
    reactionMessage
  } = useWeTalk()

  // Fetch all users/contacts
  const fetchContacts = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await getAllUser()
      console.log('API Response:', response) // Debug log
      
      // The API returns { data: [...] } instead of { users: [...] }
      const usersData = response.data || response.users || response || []
      
      if (!Array.isArray(usersData)) {
        console.warn('Expected array but got:', typeof usersData, usersData)
        throw new Error('Invalid response format')
      }

      const formattedContacts: Contact[] = usersData.map((user: any, index: number) => ({
        id: user.id.toString(),
        name: user.username || user.name || `User ${user.id}`,
        avatar: user.profilePicture ? getAvatarFromUrl(user.profilePicture) : getRandomAvatar(index),
        status: user.isOnline ? 'online' : 'offline',
        lastMessage: user.lastMessage || 'No messages yet',
        unreadCount: user.unreadCount || 0,
        isTyping: false,
        gradient: getRandomGradient(index),
        userId: user.id
      }))

      console.log('Formatted Contacts:', formattedContacts) // Debug log

      setContacts(formattedContacts)
      if (formattedContacts.length > 0 && !activeContact) {
        setActiveContact(formattedContacts[0])
      }
    } catch (err) {
      console.error('Error fetching contacts:', err)
      setError('Failed to fetch contacts. Please check your connection.')
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }, [activeContact])

  // Fetch user conversations
  const fetchConversations = useCallback(async (userId: number) => {
    try {
      setIsLoading(true)
      const response = await getUserConversation(userId)
      
      const formattedConversations: Conversation[] = response.conversations?.map((conv: any) => ({
        id: conv.id.toString(),
        participants: conv.participants || [],
        lastMessage: conv.lastMessage,
        updatedAt: new Date(conv.updatedAt),
        unreadCount: conv.unreadCount || 0
      })) || []

      setConversations(formattedConversations)
    } catch (err) {
      setError('Failed to fetch conversations')
      console.error('Error fetching conversations:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch messages for a conversation
  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      setIsLoading(true)
      const response = await getMessages(parseInt(conversationId))
      console.log('Messages API Response:', response) // Debug log
      
      // Handle different possible response structures
      const messagesData = response.data || response.messages || response || []
      
      if (!Array.isArray(messagesData)) {
        console.warn('Expected messages array but got:', typeof messagesData, messagesData)
        setMessages([])
        return
      }
      
      const formattedMessages: Message[] = messagesData.map((msg: any) => ({
        id: msg.id.toString(),
        text: msg.content || msg.text || msg.message,
        sender: msg.isFromCurrentUser || msg.fromCurrentUser ? 'user' : 'other',
        timestamp: new Date(msg.createdAt || msg.timestamp || Date.now()),
        type: msg.type || 'text',
        status: msg.status || 'sent',
        avatar: msg.sender?.avatar || msg.senderAvatar,
        senderName: msg.sender?.name || msg.senderName || msg.username,
        conversationId: conversationId,
        userId: msg.senderId || msg.userId
      }))

      console.log('Formatted Messages:', formattedMessages) // Debug log
      setMessages(formattedMessages)
      setActiveConversation(conversationId)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to fetch messages')
      // Don't clear messages on error, keep existing ones
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Send a new message
  const sendMessage = useCallback(async (text: string, conversationId?: string) => {
    if (!text.trim() || !activeContact) return

    const tempId = `temp-${Date.now()}`
    
    try {
      const messageData = {
        content: text,
        conversationId: conversationId || activeConversation,
        recipientId: activeContact.userId,
        type: 'text'
      }

      // Optimistically add message to UI
      const tempMessage: Message = {
        id: tempId,
        text,
        sender: 'user',
        timestamp: new Date(),
        type: 'text',
        status: 'sent',
        conversationId: conversationId || activeConversation || undefined
      }

      setMessages(prev => [...prev, tempMessage])

      // Send to API
      const response = await postMessage(messageData)
      console.log('Send Message Response:', response) // Debug log
      
      // Handle different response structures
      const messageResponse = response.data || response.message || response
      
      // Update with real message from server
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempId 
            ? { 
                ...msg, 
                id: messageResponse.id?.toString() || tempId, 
                status: 'delivered',
                timestamp: new Date(messageResponse.createdAt || messageResponse.timestamp || Date.now())
              }
            : msg
        )
      )

      // Simulate typing response
      simulateTypingResponse()

    } catch (err) {
      console.error('Error sending message:', err)
      setError('Failed to send message')
      
      // Remove failed message
      setMessages(prev => prev.filter(msg => msg.id !== tempId))
    }
  }, [activeContact, activeConversation])

  // Create new conversation
  const createConversation = useCallback(async (participantIds: number[]) => {
    try {
      const response = await createWeTalkConversation({
        participantIds,
        type: 'direct'
      })

      const newConversation: Conversation = {
        id: response.conversation.id.toString(),
        participants: response.conversation.participants,
        updatedAt: new Date(response.conversation.createdAt),
        unreadCount: 0
      }

      setConversations(prev => [newConversation, ...prev])
      setActiveConversation(newConversation.id)
      
      return newConversation
    } catch (err) {
      setError('Failed to create conversation')
      console.error('Error creating conversation:', err)
    }
  }, [])

  // Add reaction to message
  const addReaction = useCallback(async (messageId: string, emoji: string) => {
    try {
      await reactionMessage({
        messageId: parseInt(messageId),
        emoji,
        action: 'add'
      })

      // Update local state
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageId
            ? { ...msg, reactions: [...(msg as any).reactions || [], { emoji, userId: 'current' }] }
            : msg
        )
      )
    } catch (err) {
      setError('Failed to add reaction')
      console.error('Error adding reaction:', err)
    }
  }, [])

  // Simulate typing indicator
  const simulateTypingResponse = useCallback(() => {
    if (!activeContact) return

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      
      const autoReply: Message = {
        id: `auto-${Date.now()}`,
        text: getRandomResponse(),
        sender: 'other',
        timestamp: new Date(),
        type: 'text',
        status: 'sent',
        senderName: activeContact.name,
        avatar: activeContact.avatar,
        conversationId: activeConversation || undefined
      }
      
      setMessages(prev => [...prev, autoReply])
    }, 1500 + Math.random() * 1000) // Random delay between 1.5-2.5s
  }, [activeContact, activeConversation])

  // Switch active contact
  const switchContact = useCallback((contact: Contact) => {
    setActiveContact(contact)
    if (contact.userId) {
      fetchConversations(contact.userId)
    }
  }, [fetchConversations])

  // Initialize
  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  // Auto-fetch messages when conversation changes
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation)
    }
  }, [activeConversation, fetchMessages])

  return {
    // State
    contacts,
    conversations,
    messages,
    activeContact,
    activeConversation,
    isLoading,
    isTyping,
    error,

    // Actions
    fetchContacts,
    fetchConversations,
    fetchMessages,
    sendMessage,
    createConversation,
    addReaction,
    switchContact,
    setActiveConversation,
    setError
  }
}

// Helper functions
const getRandomAvatar = (index: number): string => {
  const avatars = ['👩‍💻', '🎨', '🚀', '🎵', '🎪', '🌟', '🎯', '🎮', '📚', '🌈']
  return avatars[index % avatars.length]
}

const getRandomGradient = (index: number): string => {
  const gradients = [
    'from-pink-400 to-purple-500',
    'from-blue-400 to-cyan-500',
    'from-orange-400 to-red-500',
    'from-green-400 to-emerald-500',
    'from-violet-400 to-indigo-500',
    'from-yellow-400 to-orange-500',
    'from-teal-400 to-blue-500',
    'from-rose-400 to-pink-500'
  ]
  return gradients[index % gradients.length]
}

const getAvatarFromUrl = (profilePictureUrl: string): string => {
  // For now, we'll use a default emoji avatar since we're using emoji avatars
  // In the future, you can return the actual image URL here
  // return profilePictureUrl
  
  // Extract initials or use a default avatar based on the URL
  const avatars = ['👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍💼']
  const hash = profilePictureUrl.split('/').pop()?.charCodeAt(0) || 0
  return avatars[hash % avatars.length]
}

const getRandomResponse = (): string => {
  const responses = [
    "That's really interesting! Tell me more 😊",
    "I completely agree with you! 👍",
    "Wow, that sounds amazing! ✨",
    "Thanks for sharing that with me 💫",
    "That's a great point! 🎯",
    "I love how you put that! 💝",
    "That made my day! 🌟",
    "Absolutely fascinating! 🚀"
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export default useFetchWeTalks