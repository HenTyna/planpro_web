
import telegramService from "@/service/telegram.service";
import { useQuery } from "@tanstack/react-query";

const useFetchTelegram = () => {
    // First service call
    const {
        data,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['telegramUserInfo'],
        queryFn: () => telegramService.getTelegramUserInfo(),
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000, // Data remains fresh for 5 minutes
        refetchInterval: 10 * 60 * 1000 // Refetch every 10 minutes
    });

    // Second service call 
    const {
        data: historyData,
        isLoading: isSettingsLoading,
        isError: isSettingsError
    } = useQuery({
        queryKey: ['telegramHistory'],
        queryFn: () => telegramService.getTelegramHistory?.(),
        enabled: !!telegramService.getTelegramHistory, // Only run if method exists
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 5 * 60 * 1000,
        refetchInterval: 10 * 60 * 1000
    });

    return {
        telegramUserInfo: data,
        telegramUserInfoLoading: isLoading,
        telegramUserInfoError: isError,
        historyData: historyData,
        historyLoading: isSettingsLoading,
        historyError: isSettingsError
    }
}

export { useFetchTelegram }