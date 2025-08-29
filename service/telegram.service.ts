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
async function getTelegramUserInfo() {
    return http.get(ServiceId.TELEGRAM + `/get-telegram-user-info`);
}

async function disconnectTelegram(chatId: number) {
    return http.put(ServiceId.TELEGRAM + `/disconnect-telegram/${chatId}`);
}

async function updateStatusTelegramSettings(chatId: number, isActive: boolean) {
    return http.put(ServiceId.TELEGRAM + `/telegram-setting/${chatId}/${isActive}`);
}

async function getTelegramHistory() {
    return http.get(ServiceId.TELEGRAM + `/get-history-of-telegram-user`);
}

async function reconnectTelegram(chatId: number) {
    return http.put(ServiceId.TELEGRAM + `/reconnect-telegram/${chatId}`);
}

const TelegramService = {
   verifyTelegram,
   connectTelegram,
   getTelegramUserInfo,
   disconnectTelegram,
   updateStatusTelegramSettings,
   getTelegramHistory,
   reconnectTelegram
}
export default TelegramService
