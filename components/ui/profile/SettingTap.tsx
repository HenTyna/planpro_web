import { Button } from '@/components/shared/ui/Button'
import { Switch } from '@/components/shared/ui/swtich'
import React, { useState } from 'react'
import ConnectTelegramBot from '../telegram/ConnectTelegramBot'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import TelegramService from '@/service/telegram.service'
import { formatDate } from '@/utils/dateformat'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

const SettingTap = () => {
    
    const [isConnected, setIsConnected] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    // get telegram user info
    const { data: tele_info, isLoading } = useQuery({
        queryKey: ['telegramUserInfo'],
        queryFn: () => TelegramService.getTelegramUserInfo()
    })
    const telegramData = tele_info?.data?.data
    //mutation update telegram settings
    const { mutate: updateTelegramSettings } = useMutation({
        mutationFn: async (data: any) => {
            const response = await TelegramService.updateStatusTelegramSettings(data, isTelegramEnabled)
            return response.data
        },
        onSuccess: () => {
            toast.success('Telegram settings updated successfully')
            queryClient.invalidateQueries({ queryKey: ['telegramUserInfo'] })
        },
        onError: () => {
            toast.error('Failed to update telegram settings')
            queryClient.invalidateQueries({ queryKey: ['telegramUserInfo'] })
        }
    })

    //mutation disconnect telegram
    const { mutate: disconnectTelegram } = useMutation({
        mutationFn: async (data: any) => {
            const response = await TelegramService.disconnectTelegram(data)
            return response.data
        },
        onSuccess: () => {
            toast.success('Telegram disconnected successfully')
            queryClient.invalidateQueries({ queryKey: ['telegramUserInfo'] })
        },
        onError: () => {
            toast.error('Failed to disconnect telegram')
            queryClient.invalidateQueries({ queryKey: ['telegramUserInfo'] })
        }
    })
    const [isTelegramEnabled, setIsTelegramEnabled] = useState(telegramData?.active)
    console.log("isTelegramEnabled", isTelegramEnabled)
    console.log("Data", telegramData)

    const toggleTelegramEnabled = () => {
        if (window.confirm("Are you sure you want to update Telegram settings?")) {
            setIsTelegramEnabled(!isTelegramEnabled)
            updateTelegramSettings(telegramData?.chatId)
        }
    }

    const handleDisconnect = () => {
        //alert confirm
        if (window.confirm("Are you sure you want to disconnect Telegram?")) {
            disconnectTelegram(telegramData?.chatId)
            setIsConnected(false)
        }
    }

    const handleConnect = () => {
        setIsOpen(true)
    }

    const isLoadingSkeleton = isLoading 

    return (
        <>
            {
                isLoadingSkeleton ? (
                    <div className="flex justify-center items-center h-full">
                        <LoadingSpinner size="lg" color="blue" />
                    </div>
                ) : (
                    <>
                        <div>
                            <div className="space-y-6">
                                {
                                    telegramData?.currentState === "STARTED" ? (
                                        <>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                                <div className="space-y-4 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
                                                    <h3 className="font-semibold text-amber-900">Telegram Settings</h3>
                                                    <div className="space-y-3">
                                                        <div className="flex flex-col gap-3">
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium">Name</span>
                                                                <span className="text-sm text-gray-700">{telegramData?.firstName} {telegramData?.lastName}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium">Username</span>
                                                                <span className="text-sm text-gray-700">{telegramData?.username || "N/A"}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium">Registered At</span>
                                                                <span className="text-sm text-gray-700">{formatDate(telegramData?.createdAt)}</span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-sm font-medium">Telegram Notifications</span>
                                                                <Switch
                                                                    checked={isTelegramEnabled}
                                                                    onCheckedChange={toggleTelegramEnabled}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                                                <div className="flex items-center mb-3 gap-2">
                                                    <h3 className="font-semibold text-gray-900">Connected Accounts</h3>
                                                    <div className="relative group flex items-center">
                                                        <svg
                                                            className="w-4 h-4 text-amber-500 cursor-pointer"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                                                            <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                            <circle cx="12" cy="8" r="1" fill="currentColor" />
                                                        </svg>
                                                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white text-xs text-gray-700 rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 border border-amber-200">
                                                            You've connected your Telegram account and you'll receive notifications.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    {["Telegram"].map((service) => (
                                                        <div key={service} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                            <span className="font-medium">{service}</span>
                                                            <Button variant="outline" size="sm" onClick={handleDisconnect}>
                                                                Disconnect
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
                                                <div className="flex items-center mb-3 gap-2">
                                                    <h3 className="font-semibold text-gray-900">Connect Telegram</h3>
                                                    {/* Tooltip with icon */}
                                                    <div className="relative group flex items-center">
                                                        <svg
                                                            className="w-4 h-4 text-amber-500 cursor-pointer"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white" />
                                                            <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                            <circle cx="12" cy="8" r="1" fill="currentColor" />
                                                        </svg>
                                                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white text-xs text-gray-700 rounded shadow-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 border border-amber-200">
                                                            To connect your Telegram account, you need to use @proplan_bot to generate your telegram id.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    {["Telegram"].map((service) => (
                                                        <div key={service} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                                            <span className="font-medium">{service}</span>
                                                            <Button variant="outline" size="sm" onClick={handleConnect}>
                                                                Connect
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )
                                }


                                {
                                    isOpen && (
                                        <ConnectTelegramBot open={isOpen} onClose={() => setIsOpen(false)} />
                                    )
                                }


                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default SettingTap