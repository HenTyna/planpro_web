import { useEffect, useRef, useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Message } from '@/lib/types/weTalk.types'
import { getCurrentUserId } from '@/lib/utils/weTalk.utils'
import { WEBSOCKET_CONFIG } from '@/lib/config/websocket'

// STOMP Client types
interface StompClient {
  connect: (headers: any, callback: () => void) => void
  subscribe: (destination: string, callback: (message: any) => void) => any
  publish: (params: { destination: string; body: string }) => void
  deactivate: () => void
  onConnect?: () => void
  onStompError?: (frame: any) => void
  activate: () => void
}

interface ChatEvent {
  eventType: 'NEW_MESSAGE' | 'MESSAGE_EDITED' | 'MESSAGE_DELETED' | 'TYPING' | null
  messageId?: number
  conversationId: number
  senderId?: number
  senderUsername?: string
  senderDisplayName?: string
  senderAvatarUrl?: string
  content?: string
  messageType?: string
  fileUrl?: string | null
  replyToMessageId?: number | null
  isEdited?: boolean
  createdAt?: string
  updatedAt?: string
  userId?: number
  username?: string
  isTyping?: boolean
}

export const useWebSocket = (conversationId?: number) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const stompClientRef = useRef<StompClient | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [currentEndpointIndex, setCurrentEndpointIndex] = useState(0)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const connectionHealthCheckRef = useRef<NodeJS.Timeout | null>(null)
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())
  const currentUserId = getCurrentUserId(session)

  // Idle timeout configuration (5 minutes of inactivity)
  const IDLE_TIMEOUT = 5 * 60 * 1000 // 5 minutes

  // Get current endpoint to try
  const getCurrentEndpoint = () => {
    const endpoints = [
      WEBSOCKET_CONFIG.ENDPOINTS.SOCKJS,
      ...WEBSOCKET_CONFIG.ENDPOINTS.ALTERNATIVES
    ]
    return endpoints[currentEndpointIndex] || WEBSOCKET_CONFIG.ENDPOINTS.SOCKJS
  }

  // Update last activity timestamp
  const updateActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
    console.log('🔄 Activity detected, resetting idle timer')
  }, [])

  // Clear all timeouts
  const clearAllTimeouts = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    if (connectionHealthCheckRef.current) {
      clearTimeout(connectionHealthCheckRef.current)
      connectionHealthCheckRef.current = null
    }
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = null
    }
  }, [])

  // Start idle timeout
  const startIdleTimeout = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
    }

    idleTimeoutRef.current = setTimeout(() => {
      console.log('⏰ Idle timeout reached, disconnecting WebSocket to save resources')
      if (stompClientRef.current) {
        try {
          stompClientRef.current.deactivate()
          stompClientRef.current = null
          setIsConnected(false)
          setConnectionError('Disconnected due to inactivity')
        } catch (error) {
          console.log('Error during idle disconnect:', error)
        }
      }
    }, IDLE_TIMEOUT)
  }, [])

  // Stop idle timeout
  const stopIdleTimeout = useCallback(() => {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = null
    }
  }, [])

  // Connection health check (reduced frequency)
  const startConnectionHealthCheck = useCallback(() => {
    if (connectionHealthCheckRef.current) {
      clearTimeout(connectionHealthCheckRef.current)
    }

    connectionHealthCheckRef.current = setInterval(() => {
      if (stompClientRef.current && !isConnected) {
        console.log('🔍 Connection health check: WebSocket appears disconnected, attempting reconnection...')
        setIsReconnecting(true)
        setConnectionError('Connection lost, attempting to reconnect...')
        
        // Force reconnection
        if (stompClientRef.current) {
          try {
            stompClientRef.current.deactivate()
          } catch (error) {
            console.log('Error during deactivation:', error)
          }
        }
        
        // Reset and reconnect
        setTimeout(() => {
          setReconnectAttempts(0)
          setCurrentEndpointIndex(0)
          setIsReconnecting(false)
        }, 1000)
      }
    }, 30000) // Reduced from 10 seconds to 30 seconds
  }, [isConnected])

  // Stop connection health check
  const stopConnectionHealthCheck = useCallback(() => {
    if (connectionHealthCheckRef.current) {
      clearTimeout(connectionHealthCheckRef.current)
      connectionHealthCheckRef.current = null
    }
  }, [])

  // Initialize STOMP client
  const initializeStompClient = useCallback(async () => {
    if (typeof window === 'undefined') return null

    try {
      // Dynamic import for SockJS and STOMP
      const SockJS = (await import('sockjs-client')).default
      const { Client } = await import('@stomp/stompjs')

      const currentEndpoint = getCurrentEndpoint()
      console.log(`Trying WebSocket endpoint: ${currentEndpoint}`)

      const client = new Client({
        webSocketFactory: () => new SockJS(currentEndpoint),
        debug: WEBSOCKET_CONFIG.STOMP.DEBUG ? (str: string) => {
          console.log('STOMP Debug:', str)
        } : undefined,
        reconnectDelay: WEBSOCKET_CONFIG.STOMP.RECONNECT_DELAY,
        heartbeatIncoming: WEBSOCKET_CONFIG.STOMP.HEARTBEAT_INCOMING,
        heartbeatOutgoing: WEBSOCKET_CONFIG.STOMP.HEARTBEAT_OUTGOING,
        connectHeaders: {
          // Add any authentication headers if needed
          'X-User-ID': currentUserId?.toString() || '',
        }
      })

      return client as unknown as StompClient
    } catch (error) {
      console.error('Failed to initialize STOMP client:', error)
      setConnectionError('Failed to initialize WebSocket client')
      return null
    }
  }, [currentUserId, currentEndpointIndex])

  // Handle incoming chat events
  const handleChatEvent = useCallback((event: ChatEvent) => {
    console.log('Received chat event:', event)
    
    // Reset idle timer on any activity
    updateActivity()

    // If eventType is null but we have messageId and content, treat it as a new message
    if (!event.eventType && event.messageId && event.content) {
      console.log('Treating null eventType as NEW_MESSAGE')
      handleNewMessage(event)
      return
    }

    switch (event.eventType) {
      case 'NEW_MESSAGE':
        handleNewMessage(event)
        break
      case 'MESSAGE_EDITED':
        handleMessageEdited(event)
        break
      case 'MESSAGE_DELETED':
        handleMessageDeleted(event)
        break
      case 'TYPING':
        handleTypingEvent(event)
        break
      default:
        console.warn('Unknown event type:', event.eventType)
    }
  }, [updateActivity])

  // Handle new message event
  const handleNewMessage = useCallback((event: ChatEvent) => {
    console.log('🔄 Processing new message:', event)
    
    // Reset idle timer on message activity
    updateActivity()
    
    if (!event.messageId || !event.conversationId) {
      console.warn('❌ Missing messageId or conversationId:', { messageId: event.messageId, conversationId: event.conversationId })
      return
    }

    // Skip processing if this is the current user's own message
    // The HTTP mutation already handles optimistic updates for user's own messages
    if (event.senderId === currentUserId) {
      console.log('⏭️ Skipping own message from WebSocket (already handled by HTTP optimistic update)')
      return
    }

    const newMessage: Message = {
      id: event.messageId.toString(),
      text: event.content || '',
      sender: event.senderId === currentUserId ? 'user' : 'other',
      timestamp: new Date(event.createdAt || Date.now()),
      type: (event.messageType as 'text' | 'image' | 'voice') || 'text',
      status: 'delivered',
      avatar: event.senderAvatarUrl,
      senderName: event.senderDisplayName || event.senderUsername,
      conversationId: event.conversationId.toString(),
      userId: event.senderId
    }

    console.log('📝 Created new message object:', newMessage)

    // Update messages in real-time - add to BOTTOM (last page)
    const conversationIdStr = event.conversationId.toString()
    console.log('💬 Updating messages for conversation:', conversationIdStr)
    
    queryClient.setQueryData(['messages', conversationIdStr], (old: any) => {
      console.log('📊 Current query data:', old)
      
      if (!old) {
        console.log('🆕 No existing data, creating new structure')
        return { pages: [[newMessage]], pageParams: [1] }
      }
      
      // Check if message already exists
      const messageExists = old.pages.some((page: Message[]) => 
        page.some((msg: Message) => msg.id === newMessage.id)
      )
      
      if (messageExists) {
        console.log('⚠️ Message already exists, skipping')
        return old
      }

      // Add to the last page (bottom) instead of first page (top)
      const lastPageIndex = old.pages.length - 1
      console.log('➕ Adding message to last page:', lastPageIndex)
      
      const updatedData = {
        ...old,
        pages: old.pages.map((page: Message[], index: number) => 
          index === lastPageIndex ? [...page, newMessage] : page
        )
      }
      
      console.log('✅ Updated query data:', updatedData)
      return updatedData
    })

    // Update contact lists
    console.log('🔄 Invalidating contact queries')
    queryClient.invalidateQueries({ queryKey: ['contacts'] })
    queryClient.invalidateQueries({ queryKey: ['my-contacts'] })
  }, [currentUserId, queryClient, updateActivity])

  // Handle message edited event
  const handleMessageEdited = useCallback((event: ChatEvent) => {
    if (!event.messageId || !event.conversationId) return

    const conversationIdStr = event.conversationId.toString()
    queryClient.setQueryData(['messages', conversationIdStr], (old: any) => {
      if (!old) return old

      return {
        ...old,
        pages: old.pages.map((page: Message[]) => 
          page.map((msg: Message) => 
            msg.id === event.messageId?.toString()
              ? { 
                  ...msg, 
                  text: event.content || msg.text,
                  timestamp: new Date(event.updatedAt || Date.now())
                }
              : msg
          )
        )
      }
    })
  }, [queryClient])

  // Handle message deleted event
  const handleMessageDeleted = useCallback((event: ChatEvent) => {
    if (!event.messageId || !event.conversationId) return

    const conversationIdStr = event.conversationId.toString()
    queryClient.setQueryData(['messages', conversationIdStr], (old: any) => {
      if (!old) return old

      return {
        ...old,
        pages: old.pages.map((page: Message[]) => 
          page.filter((msg: Message) => msg.id !== event.messageId?.toString())
        )
      }
    })
  }, [queryClient])

  // Handle typing event
  const handleTypingEvent = useCallback((event: ChatEvent) => {
    if (!event.username || event.isTyping === undefined) return

    // Reset idle timer on typing activity
    updateActivity()

    setTypingUsers(prev => {
      if (event.isTyping) {
        return prev.includes(event.username!) ? prev : [...prev, event.username!]
      } else {
        return prev.filter(user => user !== event.username)
      }
    })
  }, [updateActivity])

  // Retry connection with different endpoint
  const retryConnection = useCallback(() => {
    const endpoints = [
      WEBSOCKET_CONFIG.ENDPOINTS.SOCKJS,
      ...WEBSOCKET_CONFIG.ENDPOINTS.ALTERNATIVES
    ]
    
    if (currentEndpointIndex < endpoints.length - 1) {
      console.log(`Retrying with next endpoint (${currentEndpointIndex + 1}/${endpoints.length})`)
      setCurrentEndpointIndex(prev => prev + 1)
      setConnectionError(null)
    } else {
      console.log('All endpoints tried, connection failed')
      setConnectionError('All WebSocket endpoints failed - check server configuration')
    }
  }, [currentEndpointIndex])

  // Connect to WebSocket
  useEffect(() => {
    if (!session?.user || !conversationId) {
      // Clean up if no session or conversation
      if (stompClientRef.current) {
        console.log('Cleaning up WebSocket - no session or conversation')
        stompClientRef.current.deactivate()
        stompClientRef.current = null
        setIsConnected(false)
        setTypingUsers([])
        setConnectionError(null)
        stopConnectionHealthCheck()
        stopIdleTimeout() // Ensure idle timeout is stopped
      }
      return
    }

    let client: StompClient | null = null
    let connectionTimeout: NodeJS.Timeout | null = null

    const connectWebSocket = async () => {
      try {
        setConnectionError(null)
        setIsReconnecting(false)
        const currentEndpoint = getCurrentEndpoint()
        console.log('Attempting to connect to WebSocket at:', currentEndpoint)
        
        client = await initializeStompClient()
        if (!client) {
          console.error('Failed to initialize STOMP client')
          return
        }

        // Set connection timeout
        connectionTimeout = setTimeout(() => {
          console.error('WebSocket connection timeout')
          setConnectionError('WebSocket connection timeout - trying next endpoint...')
          setIsConnected(false)
          setIsReconnecting(true)
          
          // Try next endpoint
          setTimeout(() => {
            retryConnection()
            setIsReconnecting(false)
          }, 1000)
        }, WEBSOCKET_CONFIG.STOMP.CONNECT_TIMEOUT)

        client.onConnect = () => {
          console.log('✅ Successfully connected to WebSocket')
          setIsConnected(true)
          setConnectionError(null)
          setIsReconnecting(false)
          setReconnectAttempts(0)
          
          if (connectionTimeout) {
            clearTimeout(connectionTimeout)
            connectionTimeout = null
          }
          
          // Start connection health check
          startConnectionHealthCheck()
          startIdleTimeout() // Start idle timeout after successful connection
          
          // Subscribe to conversation messages
          client?.subscribe(WEBSOCKET_CONFIG.STOMP.DESTINATIONS.CONVERSATION_TOPIC(conversationId), (message) => {
            try {
              const event: ChatEvent = JSON.parse(message.body)
              console.log('📨 Received message via WebSocket:', event)
              handleChatEvent(event)
            } catch (error) {
              console.error('Failed to parse WebSocket message:', error)
            }
          })
          
          // Subscribe to user-specific messages
          if (currentUserId) {
            client?.subscribe(WEBSOCKET_CONFIG.STOMP.DESTINATIONS.USER_QUEUE(currentUserId), (message) => {
              try {
                const event: ChatEvent = JSON.parse(message.body)
                console.log('📨 Received user message via WebSocket:', event)
                handleChatEvent(event)
              } catch (error) {
                console.error('Failed to parse user message:', error)
              }
            })
          }

          // Join conversation
          console.log('Joining conversation:', conversationId)
          client?.publish({
            destination: WEBSOCKET_CONFIG.STOMP.DESTINATIONS.JOIN_CONVERSATION,
            body: conversationId.toString()
          })
        }

        client.onStompError = (frame) => {
          console.error('❌ STOMP error:', frame)
          setConnectionError(`WebSocket error: ${frame.headers?.message || 'Server not available'} - trying next endpoint...`)
          setIsConnected(false)
          setIsReconnecting(true)
          
          if (connectionTimeout) {
            clearTimeout(connectionTimeout)
            connectionTimeout = null
          }
          
          // Try next endpoint
          setTimeout(() => {
            retryConnection()
            setIsReconnecting(false)
          }, 1000)
        }

        console.log('Activating STOMP client...')
        client.activate()
        stompClientRef.current = client

      } catch (error) {
        console.error('❌ Failed to connect WebSocket:', error)
        setConnectionError('Failed to connect to WebSocket server - trying next endpoint...')
        setIsConnected(false)
        setIsReconnecting(true)
        
        if (connectionTimeout) {
          clearTimeout(connectionTimeout)
          connectionTimeout = null
        }
        
        // Try next endpoint
        setTimeout(() => {
          retryConnection()
          setIsReconnecting(false)
        }, 1000)
      }
    }

    connectWebSocket()

    return () => {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout)
      }
      
      if (client) {
        console.log('Disconnecting from WebSocket...')
        try {
          client.deactivate()
        } catch (error) {
          console.log('Error during WebSocket deactivation:', error)
        }
        stompClientRef.current = null
        setIsConnected(false)
        setTypingUsers([])
        setConnectionError(null)
        stopConnectionHealthCheck()
        stopIdleTimeout() // Ensure idle timeout is stopped on unmount
      }
    }
  }, [session?.user, currentUserId, conversationId, initializeStompClient, handleChatEvent, retryConnection, startConnectionHealthCheck, stopConnectionHealthCheck, startIdleTimeout, stopIdleTimeout])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllTimeouts()
      stopConnectionHealthCheck()
      stopIdleTimeout() // Ensure idle timeout is stopped on unmount
      if (stompClientRef.current) {
        try {
          stompClientRef.current.deactivate()
        } catch (error) {
          console.log('Error during cleanup:', error)
        }
      }
    }
  }, [clearAllTimeouts, stopConnectionHealthCheck, stopIdleTimeout])

  // Send message via WebSocket
  const sendMessage = useCallback((message: any) => {
    if (stompClientRef.current && isConnected) {
      stompClientRef.current.publish({
        destination: WEBSOCKET_CONFIG.STOMP.DESTINATIONS.SEND_MESSAGE,
        body: JSON.stringify(message)
      })
    } else {
      console.warn('WebSocket not connected, message will be sent via HTTP only')
    }
  }, [isConnected])

  // Send typing indicator
  const sendTypingIndicator = useCallback((isTyping: boolean) => {
    if (stompClientRef.current && isConnected && conversationId) {
      // Reset idle timer on typing activity
      updateActivity()
      
      stompClientRef.current.publish({
        destination: WEBSOCKET_CONFIG.STOMP.DESTINATIONS.TYPING,
        body: JSON.stringify({
          conversationId: conversationId,
          isTyping: isTyping
        })
      })
    }
  }, [isConnected, conversationId, updateActivity])

  return {
    isConnected,
    isReconnecting,
    sendMessage,
    sendTypingIndicator,
    typingUsers,
    connectionError,
    retryConnection
  }
} 