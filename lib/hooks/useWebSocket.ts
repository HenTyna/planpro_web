import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Message } from '@/lib/types/weTalk.types'
import { getCurrentUserId } from '@/lib/utils/weTalk.utils'

export const useWebSocket = (conversationId?: number) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const wsRef = useRef<WebSocket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const currentUserId = getCurrentUserId(session)

  useEffect(() => {
    if (!session?.user) return

    // Replace with your actual WebSocket URL
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:9090'}/ws?userId=${currentUserId}`
    
    try {
      wsRef.current = new WebSocket(wsUrl)

      wsRef.current.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        
        if (conversationId) {
          wsRef.current?.send(JSON.stringify({
            type: 'join_conversation',
            conversationId: conversationId
          }))
        }
      }

      wsRef.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          
          if (message.type === 'new_message') {
            const newMessage: Message = {
              id: message.data.id.toString(),
              text: message.data.content,
              sender: message.data.senderId === currentUserId ? 'user' : 'other',
              timestamp: new Date(message.data.createdAt),
              type: message.data.messageType || 'text',
              status: 'delivered',
              avatar: message.data.senderAvatarUrl,
              senderName: message.data.senderDisplayName || message.data.senderUsername,
              conversationId: message.data.conversationId.toString(),
              userId: message.data.senderId
            }

            // Update messages in real-time
            const conversationIdStr = message.data.conversationId.toString()
            queryClient.setQueryData(['messages', conversationIdStr], (old: any) => {
              if (!old) return { pages: [[newMessage]], pageParams: [1] }
              
              // Check if message already exists
              const messageExists = old.pages.some((page: Message[]) => 
                page.some((msg: Message) => msg.id === newMessage.id)
              )
              
              if (messageExists) return old

              return {
                ...old,
                pages: old.pages.map((page: Message[], index: number) => 
                  index === 0 ? [newMessage, ...page] : page
                )
              }
            })

            // Update contact lists
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
            queryClient.invalidateQueries({ queryKey: ['my-contacts'] })
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error)
        }
      }

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
        
        // Attempt to reconnect after 3 seconds
        setTimeout(() => {
          if (session?.user) {
            // Reconnect logic would go here
          }
        }, 3000)
      }

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }
    } catch (error) {
      console.error('Failed to connect WebSocket:', error)
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
        setIsConnected(false)
      }
    }
  }, [session?.user, currentUserId, conversationId, queryClient])

  const sendMessage = (message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message))
    }
  }

  return {
    isConnected,
    sendMessage
  }
} 