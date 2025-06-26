import { Contact, MyContact } from '@/lib/types/weTalk.types'

export const getRandomAvatar = (index: number): string => {
  const avatars = ['👩‍💻', '🎨', '🚀', '🎵', '🎪', '🌟', '🎯', '🎮', '📚', '🌈']
  return avatars[index % avatars.length]
}

export const getRandomGradient = (index: number): string => {
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

export const getAvatarFromUrl = (profilePictureUrl: string): string => {
  // For now, we'll use a default emoji avatar since we're using emoji avatars
  // In the future, you can return the actual image URL here
  // return profilePictureUrl

  // Extract initials or use a default avatar based on the URL
  const avatars = ['👤', '👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '🧑‍💼']
  const hash = profilePictureUrl.split('/').pop()?.charCodeAt(0) || 0
  return avatars[hash % avatars.length]
}

export const getRandomResponse = (): string => {
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

export const formatUserToContact = (user: any, index: number): Contact => ({
  conversationId: user.conversationId,
  id: user.id.toString(),
  name: user.username || user.name || `User ${user.id}`,
  avatar: user.profilePicture ? getAvatarFromUrl(user.profilePicture) : getRandomAvatar(index),
  status: user.isOnline ? 'online' : 'offline',
  lastMessage: user.lastMessage || 'No messages yet',
  unreadCount: user.unreadCount || 0,
  isTyping: false,
  gradient: getRandomGradient(index),
  userId: user.id
})

export const formatMyContactToContact = (user: any, index: number): Contact => ({
  conversationId: user.conversationId,
  id: user.id.toString(),
  name: user.username || user.name || `User ${user.id}`,
  avatar: user.profilePicture ? getAvatarFromUrl(user.profilePicture) : getRandomAvatar(index),
  status: user.isOnline ? 'online' : 'offline',
  lastMessage: user.lastMessage || 'No messages yet',
  unreadCount: user.unreadCount || 0,
  isTyping: false,
  gradient: getRandomGradient(index),
  userId: user.id
})

export const formatAllUsersToContacts = (user: any, index: number): Contact => ({
  conversationId: user.conversationId,
  id: user.id.toString(),
  name: user.username || user.name || `User ${user.id}`,
  avatar: user.profilePicture ? getAvatarFromUrl(user.profilePicture) : getRandomAvatar(index),
  status: user.isOnline ? 'online' : Math.random() > 0.3 ? 'offline' : 'away',
  lastMessage: 'Start a conversation',
  unreadCount: 0,
  isTyping: false,
  gradient: getRandomGradient(index),
  userId: user.id
})

// New formatter specifically for myContacts data structure
export const formatMyContactData = (contact: any, index: number): MyContact => ({
  userId: contact.userId,
  conversationId: contact.conversationId,
  username: contact.username || `Unknown User`,
  avatarUrl: contact.avatarUrl ? getAvatarFromUrl(contact.avatarUrl) : getRandomAvatar(index),
  lastMessage: contact.lastMessage || 'No messages yet',
  lastMessageTime: contact.lastMessageTime || new Date().toLocaleString(),
  messageDate: contact.messageDate || new Date().toLocaleString(),
  status: contact.isOnline ? 'online' : Math.random() > 0.3 ? 'offline' : 'away',
  unreadCount: contact.unreadCount || 0,
  gradient: getRandomGradient(index),
  isTyping: false
})

export const extractConversationId = (userChatResponse: any): string | null => {
  return userChatResponse?.conversationId || 
         userChatResponse?.conversation_id || 
         userChatResponse?.data?.conversationId ||
         userChatResponse?.data?.conversation_id || null
}

export const getCurrentUserId = (session: any): number => {
  return (session?.user as any)?.id || 
         (session?.user as any)?.userId || 
         (session?.user as any)?.sub || 
         1 // Fallback ID
}

// Convert MyContact to Contact for component compatibility
export const convertMyContactToContact = (myContact: MyContact): Contact => ({
  id: myContact.userId.toString(),
  name: myContact.username,
  avatar: myContact.avatarUrl,
  status: myContact.status,
  lastMessage: myContact.lastMessage,
  unreadCount: myContact.unreadCount,
  isTyping: myContact.isTyping || false,
  gradient: myContact.gradient,
  userId: myContact.userId,
  conversationId: myContact.conversationId.toString()
}) 