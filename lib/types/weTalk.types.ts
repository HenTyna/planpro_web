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
  userId?: number | null
  conversationId?: string
}

export interface MyContact {
  userId: number
  conversationId: number
  username: string
  avatarUrl: string
  lastMessage: string
  lastMessageTime: string
  messageDate: string
  status: 'online' | 'offline' | 'away'
  unreadCount: number
  gradient: string
  isTyping?: boolean
}

export interface Conversation {
  id: string
  participants: Contact[]
  lastMessage?: Message
  updatedAt: Date
  unreadCount: number
}

export interface WeTalkState {
  contacts: Contact[]
  allUsers: Contact[]
  allUserConversation: Conversation[]
  conversations: Conversation[]
  messages: Message[]
  activeContact: Contact | null
  activeConversation: string | null
  isLoading: boolean
  isTyping: boolean
  error: string | null
}

export interface CreateConversationParams {
  isGroup: boolean
  name: string
  memberIds: number[]
}

export interface MessageData {
  conversationId: number
  content: string
  senderId: number
}

export interface ReactionParams {
  messageId: number
  emoji: string
  action: 'add' | 'remove'
} 

export interface ContactRequest { 
  contactUserId: number;
}

export interface SendMessageRequest {
  content: string;
  messageType: string; 
  fileUrl?: string;
  replyToMessageId?: number;
}
