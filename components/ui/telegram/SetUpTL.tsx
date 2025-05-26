import { Button } from '@/components/shared/ui/Button'
import { Bell, Plus } from 'lucide-react'
import React from 'react'

const SetUpTL = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center py-16 text-center">
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

            <Button className=" hover:text-white border border-gray-400  text-gray-800 hover:bg-gray-50">
                <Plus className="h-4 w-4 mr-2" />
                SetUp Telegram
            </Button>
        </div>
    )
}

export default SetUpTL