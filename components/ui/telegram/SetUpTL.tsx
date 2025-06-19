import LandingSpinner from '@/components/shared/LandingSpinner'
import { Button } from '@/components/shared/ui/Button'
import TelegramList from '@/components/ui/telegram/TelegramList'
import TelegramService from '@/service/telegram.service'
import { useQuery } from '@tanstack/react-query'
import { Bell, Plus } from 'lucide-react'
import { useState } from 'react'
import ConnectTelegramBot from './ConnectTelegramBot'
const SetUpTL = () => {
    const [isConnected, setIsConnected] = useState(false)
    const { data, isLoading, isError } = useQuery({
        queryKey: ['telegram-user-info'],
        queryFn: () => TelegramService.getTelegramUserInfo()
    })
    const active = data?.data?.data?.active;

    if (isLoading) return (
        <div className="bg-gray-50 max-h-screen overflow-auto">
            <div className="mx-auto p-4">
                <LandingSpinner />
            </div>
        </div>
    )
    if (isError) return <div>Error</div>
    return (
        <div className="flex flex-col h-screen">
            {
                active === true ? (
                    <TelegramList />
                ) : (
                    <>
                        <div className="relative mb-6">
                            {/* Sad emoji */}
                            <div className="text-6xl mb-4">😟</div>
                            {/* Bell icon with blue background */}
                            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <Bell className="h-8 w-8 text-blue-500" />
                            </div>
                        </div>

                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            You haven't set up your telegram reminders
                        </h3>

                        <p className="text-gray-500 mb-6 max-w-md">
                            Set up your telegram reminders
                        </p>

                        <Button onClick={() => setIsConnected(true)} className=" hover:text-white border border-gray-400  text-gray-800 hover:bg-gray-50">
                            <Plus className="h-4 w-4 mr-2" />
                            SetUp Telegram
                        </Button>
                    </>
                )
            }
            {
                isConnected && <ConnectTelegramBot open={isConnected} onClose={() => setIsConnected(false)} />
            }
        </div>
    )
}

export default SetUpTL