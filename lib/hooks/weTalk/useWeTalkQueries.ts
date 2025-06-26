import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useWeTalk } from '@/service/weTalk.service'
import { 
  Message, 
  CreateConversationParams, 
  SendMessageRequest,
  ContactRequest
} from '@/lib/types/weTalk.types'
import { 
  formatUserToContact, 
  formatAllUsersToContacts,
  formatMyContactData,
  getCurrentUserId
} from '@/lib/utils/weTalk.utils'

// Query Keys
export const QUERY_KEYS = {
  CONTACTS: ['contacts'],
  ALL_USERS: ['all-users'],
  USER_CONVERSATIONS: ['user-conversations'],
  CONVERSATION: (conversationId: number) => ['conversation', conversationId],
  MESSAGES: (conversationId: string) => ['messages', conversationId],
  PENDING_CONTACTS: ['pending-contacts'],
  UNREAD_COUNT: (conversationId: number) => ['unread-count', conversationId],
  MY_CONTACTS: ['my-contacts']
} as const

export const useWeTalkQueries = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()
  const {
    getUserContacts,
    getPendingContactsRequest,
    acceptContactRequest,
    rejectContactRequest,
    addContact,
    getUserConversations,
    getConversationById,
    getUnreadMessageCount,
    createDirectConversation,
    markConversationAsRead,
    getConversationMessages,
    sendMessage,
    deleteMessage,
    getMyContacts
  } = useWeTalk()

  // Get current user ID for message comparison
  const currentUserId = getCurrentUserId(session)

  // Fetch contacts (users with existing conversations)
  const useContactsQuery = () => {
    return useQuery({
      queryKey: QUERY_KEYS.CONTACTS,
      queryFn: async () => {
        const response = await getUserContacts()
        const contactsData = response.data || response.contacts || response || []
        if (!Array.isArray(contactsData)) {
          throw new Error('Invalid response format')
        }
        
        return contactsData.map(formatUserToContact)
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
    })
  }

  // Fetch pending contact requests
  const usePendingContactsQuery = () => {
    return useQuery({
      queryKey: QUERY_KEYS.PENDING_CONTACTS,
      queryFn: async () => {
        const response = await getPendingContactsRequest()
        const pendingData = response.data || response.requests || response || []
        
        if (!Array.isArray(pendingData)) {
          throw new Error('Invalid response format')
        }
        
        return pendingData.map(formatUserToContact)
      },
      staleTime: 1000 * 60 * 2, // 2 minutes
    })
  }

  // Fetch user conversations
  const useUserConversationsQuery = () => {
    return useQuery({
      queryKey: QUERY_KEYS.USER_CONVERSATIONS,
      queryFn: async () => {
        const response = await getUserConversations()
        const conversationsData = response.data || response.conversations || response || []
        
        if (!Array.isArray(conversationsData)) {
          throw new Error('Invalid response format')
        }
        
        return conversationsData.map((conv: any) => ({
          id: conv.id.toString(),
          participants: conv.participants || [],
          lastMessage: conv.lastMessage,
          updatedAt: new Date(conv.updatedAt),
          unreadCount: conv.unreadCount || 0
        }))
      },
      staleTime: 1000 * 60 * 3, // 3 minutes
    })
  }

  // Fetch specific conversation
  const useConversationQuery = (conversationId: number) => {
    return useQuery({
      queryKey: QUERY_KEYS.CONVERSATION(conversationId),
      queryFn: async () => {
        const response = await getConversationById(conversationId)
        return response.data || response
      },
      enabled: !!conversationId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    })
  }

  // Fetch unread message count
  const useUnreadCountQuery = (conversationId: number) => {
    return useQuery({
      queryKey: QUERY_KEYS.UNREAD_COUNT(conversationId),
      queryFn: async () => {
        const response = await getUnreadMessageCount(conversationId)
        return response.data || response.count || 0
      },
      enabled: !!conversationId,
      staleTime: 1000 * 30, // 30 seconds
    })
  }

  // Fetch messages with infinite scroll support
  const useMessagesQuery = (conversationId: any) => {
    return useInfiniteQuery({
      queryKey: QUERY_KEYS.MESSAGES(conversationId),
      queryFn: async ({ pageParam }: { pageParam: number }) => {
        const response = await getConversationMessages(parseInt(conversationId))
        const messagesData = response.data || response.messages || response || []
        
        if (!Array.isArray(messagesData)) {
          return []
        }

        return messagesData.map((msg: any): Message => {
          const isCurrentUser = msg.senderId === currentUserId
          console.log(`Message ${msg.id}: senderId=${msg.senderId}, currentUserId=${currentUserId}, isCurrentUser=${isCurrentUser}`)
          
          return {
            id: msg.id.toString(),
            text: msg.content || msg.text || msg.message,
            sender: isCurrentUser ? 'user' : 'other',
            timestamp: new Date(msg.createdAt || msg.timestamp || Date.now()),
            type: msg.messageType || msg.type || 'text',
            status: msg.status || 'sent',
            avatar: msg.senderAvatarUrl || msg.avatar,
            senderName: msg.senderDisplayName || msg.senderUsername || msg.username,
            conversationId: conversationId,
            userId: msg.senderId || msg.userId
          }
        })
      },
      initialPageParam: 1,
      enabled: !!conversationId,
      getNextPageParam: (lastPage: Message[]) => {
        return lastPage.length === 20 ? lastPage.length / 20 + 1 : undefined
      },
      staleTime: 1000 * 60, // 1 minute - WebSocket will handle real-time updates
      refetchInterval: false, // Disable polling since we have WebSocket
      refetchOnWindowFocus: false, // Let WebSocket handle focus updates
    })
  }

  // Add contact mutation
  const useAddContactMutation = () => {
    return useMutation({
      mutationFn: async (data: ContactRequest) => {
        return await addContact(data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONTACTS })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PENDING_CONTACTS })
      }
    })
  }

  // Accept contact request mutation
  const useAcceptContactMutation = () => {
    return useMutation({
      mutationFn: async (contactId: number) => {
        return await acceptContactRequest(contactId)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONTACTS })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PENDING_CONTACTS })
      }
    })
  }

  // Reject contact request mutation
  const useRejectContactMutation = () => {
    return useMutation({
      mutationFn: async (contactId: number) => {
        return await rejectContactRequest(contactId)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PENDING_CONTACTS })
      }
    })
  }

  // Create direct conversation mutation
  const useCreateDirectConversationMutation = () => {
    return useMutation({
      mutationFn: async (userId: number) => {
        return await createDirectConversation(userId)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONTACTS })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_CONVERSATIONS })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_CONTACTS })
      }
    })
  }

  // Mark conversation as read mutation
  const useMarkAsReadMutation = () => {
    return useMutation({
      mutationFn: async (conversationId: number) => {
        return await markConversationAsRead(conversationId)
      },
      onSuccess: (_, conversationId) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNREAD_COUNT(conversationId) })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONTACTS })
      }
    })
  }

  // Send message mutation
  const useSendMessageMutation = () => {
    return useMutation({
      mutationFn: async ({ conversationId, messageData }: { conversationId: number, messageData: SendMessageRequest }) => {
        return await sendMessage(conversationId, messageData)
      },
      onMutate: async ({ conversationId, messageData }) => {
        // Optimistic update
        const conversationIdStr = conversationId.toString()
        await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MESSAGES(conversationIdStr) })
        
        const previousMessages = queryClient.getQueryData(QUERY_KEYS.MESSAGES(conversationIdStr))
        
        // Add optimistic message
        const optimisticMessage: Message = {
          id: `temp-${Date.now()}`,
          text: messageData.content,
          sender: 'user',
          timestamp: new Date(),
          type: 'text',
          status: 'sent',
          conversationId: conversationIdStr,
          userId: currentUserId
        }

        queryClient.setQueryData(QUERY_KEYS.MESSAGES(conversationIdStr), (old: any) => {
          if (!old) return { pages: [[optimisticMessage]], pageParams: [1] }
          return {
            ...old,
            pages: old.pages.map((page: Message[], index: number) => 
              index === 0 ? [optimisticMessage, ...page] : page
            )
          }
        })

        return { previousMessages, optimisticMessage }
      },
      onError: (_err, { conversationId }, context) => {
        // Rollback optimistic update
        if (context?.previousMessages) {
          queryClient.setQueryData(
            QUERY_KEYS.MESSAGES(conversationId.toString()),
            context.previousMessages
          )
        }
      },
      onSuccess: (data, { conversationId }, context) => {
        // Update with real message from server
        const conversationIdStr = conversationId.toString()
        queryClient.setQueryData(QUERY_KEYS.MESSAGES(conversationIdStr), (old: any) => {
          if (!old) return old
          return {
            ...old,
            pages: old.pages.map((page: Message[]) => 
              page.map((msg: Message) => 
                msg.id === context?.optimisticMessage.id 
                  ? { ...msg, id: data.data?.id?.toString() || msg.id, status: 'delivered' }
                  : msg
              )
            )
          }
        })

        // Invalidate related queries
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONTACTS })
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_CONVERSATIONS })
      }
    })
  }

  // Delete message mutation
  const useDeleteMessageMutation = () => {
    return useMutation({
      mutationFn: async (messageId: number) => {
        return await deleteMessage(messageId)
      },
      onSuccess: () => {
        // Invalidate messages queries to refresh the list
        queryClient.invalidateQueries({ queryKey: ['messages'] })
      }
    })
  }

  //fetch my contacts
  const useMyContactsQuery = () => {
    return useQuery({
      queryKey: QUERY_KEYS.MY_CONTACTS,
      queryFn: async () => {
        try {
          const response = await getMyContacts()
          const contactsData = response?.data || []
          
          if (!Array.isArray(contactsData)) {
            console.error('Invalid contacts data format:', contactsData)
            return []
          }

          return contactsData.map((contact, index) => formatMyContactData(contact, index))
        } catch (error) {
          console.error('Error fetching contacts:', error)
          return []
        }
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
      retryDelay: 1000,
      refetchOnWindowFocus: false,
      enabled: true // Ensure hook is always enabled
    })
  }
  return {
    // Queries
    useContactsQuery,
    usePendingContactsQuery,
    useUserConversationsQuery,
    useConversationQuery,
    useUnreadCountQuery,
    useMessagesQuery,
    useMyContactsQuery,
    // Mutations
    useAddContactMutation,
    useAcceptContactMutation,
    useRejectContactMutation,
    useCreateDirectConversationMutation,
    useMarkAsReadMutation,
    useSendMessageMutation,
    useDeleteMessageMutation,
    
    // Query client for manual operations
    queryClient
  }
} 