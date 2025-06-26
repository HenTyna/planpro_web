import { SendMessageRequest, ContactRequest } from "@/lib/types/weTalk.types"
import { http } from "@/utils/http"

const weTalkService = {
    WE_TALK: '/api/wb/v1/chat'
}


// Contact endpoints
async function getUserContacts() {
    const response = await http.get(weTalkService.WE_TALK + `/contacts`)
    return response.data
}

async function getPendingContactsRequest() {
    const response = await http.get(weTalkService.WE_TALK + `/contacts/request`)
    return response.data
}

async function acceptContactRequest(contactId: number) {
    const response = await http.patch(weTalkService.WE_TALK + `/contacts/${contactId}/accept`)
    return response.data
}

async function rejectContactRequest(contactId: number) {
    const response = await http.patch(weTalkService.WE_TALK + `/contacts/${contactId}/reject`)
    return response.data
}

async function addContact(body: ContactRequest) {
    const response = await http.post(weTalkService.WE_TALK + `/contacts`, body)
    return response.data
}

// Conversation endpoints
async function getUserConversations() {
    const response = await http.get(weTalkService.WE_TALK + `/conversations`)
    return response.data
}

async function getConversationById(conversationId: number) {
    const response = await http.get(weTalkService.WE_TALK + `/conversations/${conversationId}`)
    return response.data
}

async function getUnreadMessageCount(conversationId: number) {
    const response = await http.get(weTalkService.WE_TALK + `/conversations/unread_count/${conversationId}`)
    return response.data
}

async function createDirectConversation(userId: number) {
    const response = await http.post(weTalkService.WE_TALK + `/conversations/${userId}`)
    return response.data
}

async function markConversationAsRead(conversationId: number) {
    const response = await http.post(weTalkService.WE_TALK + `/conversations/as_read/${conversationId}`)
    return response.data
}

// Message endpoints
async function getConversationMessages(conversationId: number) {
    const response = await http.get(weTalkService.WE_TALK + `/messages/${conversationId}`)
    return response.data
}

async function sendMessage(conversationId: number, body: SendMessageRequest) {
    const response = await http.post(weTalkService.WE_TALK + `/messages/${conversationId}`, body)
    return response.data
}

async function deleteMessage(messageId: number) {
    const response = await http.delete(weTalkService.WE_TALK + `/messages/${messageId}`)
    return response.data
}

//get my contacts
async function getMyContacts() {
    const response = await http.get(weTalkService.WE_TALK + `/my_contacts`)
    return response.data
}

export const useWeTalk = () => {
    return {
        // Contact methods
        getUserContacts,
        getPendingContactsRequest,
        acceptContactRequest,
        rejectContactRequest,
        addContact,
        getMyContacts,
        
        // Conversation methods
        getUserConversations,
        getConversationById,
        getUnreadMessageCount,
        createDirectConversation,
        markConversationAsRead,
        
        // Message methods
        getConversationMessages,
        sendMessage,
        deleteMessage
    }
}

