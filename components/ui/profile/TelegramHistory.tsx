import TelegramService from '@/service/telegram.service'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Card, CardContent } from '@/components/shared/ui/card'
import { Button } from '@/components/shared/ui/Button'
import { Switch } from '@/components/shared/ui/swtich'
import { Badge } from '@/components/shared/ui/badge'
import LandingSpinner from '@/components/shared/LandingSpinner'
import toast from 'react-hot-toast'
import {
    User,
    Phone,
    Calendar,
    RefreshCw,
    Wifi,
    WifiOff,
    AlertCircle,
    CheckCircle,
    Clock
} from 'lucide-react'

// Updated interface to match backend data
interface TelegramHistoryData {
    id: number
    chatId: number
    userId: number
    username: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    createdAt: string
    currentState: string
    active: boolean
    connected: boolean
}

const TelegramHistory = () => {
    const queryClient = useQueryClient()
    const [reconnectingId, setReconnectingId] = useState<number | null>(null)

    // Fetch telegram history
    const { data, isLoading, error } = useQuery({
        queryKey: ['telegramHistory'],
        queryFn: () => TelegramService.getTelegramHistory()
    })
    // Ensure telegramHistory is always an array
    const telegramHistory = data?.data?.data || []
    console.log("telegramHistory", telegramHistory)
    // Mutation for reconnecting telegram
    const reconnectMutation = useMutation({
        mutationFn: (data: any) => TelegramService.reconnectTelegram(data),
        onSuccess: () => {
            toast.success('Telegram reconnected successfully!')
            queryClient.invalidateQueries({ queryKey: ['telegramHistory'] })
            setReconnectingId(null)
        },
        onError: () => {
            toast.error('Failed to reconnect telegram')
            setReconnectingId(null)
        }
    })

    // Mutation for disconnecting telegram
    const disconnectMutation = useMutation({
        mutationFn: (chatId: number) => TelegramService.disconnectTelegram(chatId),
        onSuccess: () => {
            toast.success('Telegram disconnected successfully!')
            queryClient.invalidateQueries({ queryKey: ['telegramHistory'] })
        },
        onError: () => {
            toast.error('Failed to disconnect telegram')
        }
    })

    const handleSelectTelegramAccount = (item: any) => {
        setReconnectingId(item.id)
        reconnectMutation.mutate(item.id)
    }

    // Handle reconnect/disconnect toggle
    const handleConnectionToggle = (item: TelegramHistoryData) => {
        if (window.confirm("Are you sure you want to change Telegram connection status?")) {
            if (item.connected) {
                disconnectMutation.mutate(item.id)
            } else {
                handleSelectTelegramAccount(item)
            }
        }
    }

    // Format date
    const formatDate = (dateString: string) => {
        if (!dateString) return '-'
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Get status badge
    const getStatusBadge = (status: boolean, isActive: boolean) => {
        if (!isActive) {
            return <Badge variant="secondary" className="bg-gray-100 text-gray-600">Disconnected</Badge>
        }
        switch (status) {
            case true:
                return <Badge variant="default" className="bg-green-100 text-green-700">Connected</Badge>
            case false:
                return <Badge variant="outline" className="border-yellow-300 text-yellow-700">Pending</Badge>
            default:
                return <Badge variant="secondary" className="bg-gray-100 text-gray-600">Unknown</Badge>
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <LandingSpinner />
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Telegram History</h3>
                    <p className="text-gray-600 text-center mb-4">
                        Unable to load your telegram connection history. Please try again later.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => queryClient.invalidateQueries({ queryKey: ['telegramHistory'] })}
                    >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </CardContent>
            </Card>
        )
    }

    // Empty state
    if (!telegramHistory || telegramHistory.length === 0) {
        return (
            <Card className="w-full">
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <WifiOff className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Telegram Connections</h3>
                    <p className="text-gray-600 text-center mb-4">
                        You haven't connected any telegram accounts yet. Connect your first telegram account to get started.
                    </p>
                    <Button variant="default">
                        <Wifi className="h-4 w-4 mr-2" />
                        Connect Telegram
                    </Button>
                </CardContent>
            </Card>
        )
    }

    // Defensive: always work with an array
    const totalActive = Array.isArray(telegramHistory)
        ? telegramHistory.filter((item) => item.connected === true).length
        : 0
    const totalPending = Array.isArray(telegramHistory)
        ? telegramHistory.filter((item) => item.connected === false).length
        : 0

    return (
        <div className="space-y-6 overflow-y-auto h-[calc(100vh-100px)]">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Telegram History</h2>
                    <p className="text-gray-600 mt-1">
                        Manage your connected telegram accounts and their connection status
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['telegramHistory'] })}
                    disabled={isLoading}
                >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {totalActive}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Clock className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {totalPending}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Telegram History List */}
            <div className="space-y-4">
                {telegramHistory?.map((item: any) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                {/* Left side - User info */}
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-gray-100 rounded-full">
                                        <User className="h-6 w-6 text-gray-600" />
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {item.firstName || ''} {item.lastName || ''}
                                            </h3>
                                            {getStatusBadge(item.connected, item.active)}
                                        </div>

                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <div className="flex items-center space-x-1">
                                                <span className="font-medium">ID:</span>
                                                <span>{item.id || <span className="italic text-gray-400">No id</span>}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span className="font-medium">@</span>
                                                <span>{item.username || <span className="italic text-gray-400">No username</span>}</span>
                                            </div>

                                            <div className="flex items-center space-x-1">
                                                <Phone className="h-4 w-4" />
                                                <span>{item.phoneNumber || <span className="italic text-gray-400">No phone</span>}</span>
                                            </div>

                                            <div className="flex items-center space-x-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>Connected {formatDate(item.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right side - Actions */}
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-600">Connection</span>
                                        <Switch
                                            checked={item.connected}
                                            onCheckedChange={() => handleConnectionToggle(item)}
                                            disabled={reconnectingId === item.id}
                                        />
                                    </div>

                                    {reconnectingId === item.chatId && (
                                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                            <span>Reconnecting...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TelegramHistory