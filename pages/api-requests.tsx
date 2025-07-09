import React from 'react'
import ApiRequestManager from '@/components/ui/api-requests/ApiRequestManager'
import RootLayout from '@/components/ui/layout/RootLayout'

const ApiRequestsPage: React.FC = () => {
    return (
        <RootLayout>
            <div className="container mx-auto py-6">
                <ApiRequestManager />
            </div>
        </RootLayout>
    )
}

export default ApiRequestsPage 