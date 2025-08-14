import { Path } from "@/utils/enum"
import { http } from "@/utils/http"
import { any } from "zod"

const chatService = {
    MESSAGE: '/api/v1/messages',
    CONVERSATION: '/api/v1/conversations'
}

async function createConversation(data: any) {
    const response = await http.post(chatService.CONVERSATION, data)
    return response.data
}

async function getConverPartcipants(conversationId: string) {
    const response = await http.get(chatService.CONVERSATION + `/${conversationId}/participants`)
    return response.data
}

async function getConversationMessages(conversationId: string) {
    const params = {
        page: 0,
        limit: 50
    }
    const response = await http.get(chatService.CONVERSATION + `conversations` + `/${conversationId}/messages?${params}`)
    return response.data
}

//delivered
async function deliveredMessage(messageId: string) {
    const response = await http.post(chatService.MESSAGE + `messages` + `/${messageId}/delivered`)
    return response.data
}

//read
async function readMessage(conversationId: string, messageId: string) {
    const response = await http.post(
        chatService.MESSAGE + `conversations` + `/${conversationId}/read?messageId=${messageId}`
    );
    return response.data;
}

//send message
async function sendMessage(conversationId: string) {
    const url = `${chatService.MESSAGE}/conversations/${conversationId}/messages`;
    const response = await http.post(url);
    return response.data;
}

const ChatService = {
    createConversation,
    getConverPartcipants,
    getConversationMessages,
    deliveredMessage,
    readMessage,
    sendMessage
}

export default ChatService