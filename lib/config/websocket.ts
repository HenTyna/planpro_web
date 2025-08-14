// WebSocket Configuration
export const WEBSOCKET_CONFIG = {
  // WebSocket endpoints
  ENDPOINTS: {
    // Primary WebSocket endpoint (STOMP over SockJS)
    PRIMARY: process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:9090/ws',

    // Fallback WebSocket endpoint (direct WebSocket)
    FALLBACK: process.env.NEXT_PUBLIC_WS_FALLBACK_URL || 'ws://localhost:9090/ws',

    // SockJS endpoint (must be HTTP/HTTPS, not WebSocket)
    SOCKJS: process.env.NEXT_PUBLIC_SOCKJS_URL || 'http://localhost:9090/ws',

    // Alternative endpoints for different environments
    ALTERNATIVES: [
      'http://localhost:9090/ws',
      'http://localhost:9090/api/wb/v1/websocket',
      'http://localhost:9090/api/websocket',
      'http://localhost:9090/websocket',
      'https://your-domain.com/ws'
    ]
  },

  // STOMP configuration
  STOMP: {
    // Connection settings
    CONNECT_TIMEOUT: 10000, // Increased timeout to 10 seconds
    RECONNECT_DELAY: 5000,
    HEARTBEAT_INCOMING: 30000, // Reduced from 4000 to 30000 (30 seconds)
    HEARTBEAT_OUTGOING: 30000, // Reduced from 4000 to 30000 (30 seconds)

    // Debug mode
    DEBUG: process.env.NODE_ENV === 'development',

    // Message destinations
    DESTINATIONS: {
      // Conversation topics
      CONVERSATION_TOPIC: (conversationId: number) => `/topic/conversation/${conversationId}`,

      // User-specific queues
      USER_QUEUE: (userId: number) => `/user/${userId}/queue/messages`,

      // Application endpoints
      SEND_MESSAGE: '/app/send-message',
      JOIN_CONVERSATION: '/app/join-conversation',
      LEAVE_CONVERSATION: '/app/leave-conversation',
      TYPING: '/app/typing'
    }
  },

  // Event types
  EVENT_TYPES: {
    NEW_MESSAGE: 'NEW_MESSAGE',
    MESSAGE_EDITED: 'MESSAGE_EDITED',
    MESSAGE_DELETED: 'MESSAGE_DELETED',
    TYPING: 'TYPING',
    USER_JOINED: 'USER_JOINED',
    USER_LEFT: 'USER_LEFT',
    CONVERSATION_CREATED: 'CONVERSATION_CREATED',
    CONVERSATION_UPDATED: 'CONVERSATION_UPDATED'
  },

  // Message types
  MESSAGE_TYPES: {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    VOICE: 'VOICE',
    FILE: 'FILE',
    SYSTEM: 'SYSTEM'
  },

  // Connection states
  CONNECTION_STATES: {
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    RECONNECTING: 'RECONNECTING',
    ERROR: 'ERROR'
  },

  // Error codes
  ERROR_CODES: {
    CONNECTION_FAILED: 'CONNECTION_FAILED',
    AUTHENTICATION_FAILED: 'AUTHENTICATION_FAILED',
    SUBSCRIPTION_FAILED: 'SUBSCRIPTION_FAILED',
    MESSAGE_SEND_FAILED: 'MESSAGE_SEND_FAILED',
    TIMEOUT: 'TIMEOUT'
  },

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 5,
    INITIAL_DELAY: 1000,
    MAX_DELAY: 30000,
    BACKOFF_MULTIPLIER: 2
  },

  // Typing indicator configuration
  TYPING: {
    TIMEOUT: 2000, // Stop typing indicator after 2 seconds
    DEBOUNCE: 300, // Debounce typing events
    MAX_USERS: 5 // Maximum number of typing users to show
  },

  // Fallback configuration
  FALLBACK: {
    ENABLED: true,
    POLLING_INTERVAL: 3000, // Poll for new messages every 3 seconds when WebSocket is not available
    MAX_POLLING_ATTEMPTS: 10
  }
}

// Helper functions
export const createWebSocketUrl = (baseUrl: string, userId?: number) => {
  try {
    if (!baseUrl) return ''
    const url = new URL(baseUrl)
    if (userId) {
      url.searchParams.set('userId', String(userId))
    }
    return url.toString()
  } catch {
    return baseUrl
  }
}

export const createStompDestination = (type: 'topic' | 'queue', path: string): string => {
  return `/${type}/${path}`
}

export const createMessagePayload = (type: string, data: any): string => {
  return JSON.stringify({
    type,
    data,
    timestamp: new Date().toISOString()
  })
}

// WebSocket connection status
export const getConnectionStatus = (readyState: number): string => {
  switch (readyState) {
    case 0: return WEBSOCKET_CONFIG.CONNECTION_STATES.CONNECTING
    case 1: return WEBSOCKET_CONFIG.CONNECTION_STATES.CONNECTED
    case 2: return WEBSOCKET_CONFIG.CONNECTION_STATES.DISCONNECTED
    case 3: return WEBSOCKET_CONFIG.CONNECTION_STATES.DISCONNECTED
    default: return WEBSOCKET_CONFIG.CONNECTION_STATES.ERROR
  }
}

// Check if WebSocket is supported
export const isWebSocketSupported = (): boolean => {
  return typeof window !== 'undefined' && 'WebSocket' in window
}

// Get the best available WebSocket endpoint
export const getBestWebSocketEndpoint = (): string => {
  // Try environment-specific endpoints first
  if (process.env.NEXT_PUBLIC_WS_URL) {
    return process.env.NEXT_PUBLIC_WS_URL
  }

  if (process.env.NEXT_PUBLIC_SOCKJS_URL) {
    return process.env.NEXT_PUBLIC_SOCKJS_URL
  }

  // Fallback to default
  return WEBSOCKET_CONFIG.ENDPOINTS.SOCKJS
} 