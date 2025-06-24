import { http } from "@/utils/http"

const weTalkService = {
    WE_TALK: '/api/wb/v1/chat'
}

async function createWeTalkConversation(body: any) {
    const response = await http.post(weTalkService.WE_TALK, body )
    return response.data
}

async function getUserConversation(userId: number) {
    const response = await http.get(weTalkService.WE_TALK + `/conversations/${userId}`)
    return response.data
}

async function postMessage(body: any) {
    const response = await http.post(weTalkService.WE_TALK + `/messages`, body)
    return response.data
}

async function getMessages(conversationId: number) {
    const response = await http.get(weTalkService.WE_TALK + `/messages/${conversationId}`
    )
    return response.data
}

async function reactionMessage(body: any) {
    const response = await http.post(weTalkService.WE_TALK + `/messages/reactions`, body)
    return response.data
}
async function getAllUser() {
    const response = await http.get(weTalkService.WE_TALK + `/users`)
    return response.data
}

export const useWeTalk = () => {
    return {
        createWeTalkConversation,
        getUserConversation,
        postMessage,
        getMessages,
        reactionMessage,
        getAllUser
    }
}
