import { http } from "@/utils/http";

const ServiceId = {
    TELEGRAM: '/api/wb/v1/telegram'
}


async function verifyTelegram(chatId: number) {
    return http.get(ServiceId.TELEGRAM + `/verify-telegram/${chatId}`);
}
async function connectTelegram(chatId: number) {
    return http.put(ServiceId.TELEGRAM + `/connect-telegram/${chatId}`);
}

const TelegramService = {
   verifyTelegram,
   connectTelegram
}
export default TelegramService
