import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WeTalkContainer } from './index'

// Conditionally import devtools
let ReactQueryDevtools: React.ComponentType<any> | null = null
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const devtools = require('@tanstack/react-query-devtools')
  ReactQueryDevtools = devtools.ReactQueryDevtools
} catch {
  // Devtools not available
}

interface WeTalkDemoProps {
  mockMode?: boolean
}

// Create a client with optimized settings for real-time chat
const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: (failureCount) => {
        // Retry up to 3 times for network errors
        if (failureCount < 3) {
          return true
        }
        return false
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
    mutations: {
      retry: 1, // Retry mutations once
    },
  },
})

const WeTalkDemo: React.FC<WeTalkDemoProps> = ({ mockMode = false }) => {
  const [queryClient] = useState(() => createQueryClient())
  const [isConnected] = useState(true)

  if (mockMode) {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-screen">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Demo Mode:</strong> This is running with mock data and React Query caching. The real API integration is available when mockMode=false.
                </p>
              </div>
            </div>
          </div>
          <WeTalkContainer />
        </div>
        {ReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen">
        {!isConnected && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <strong>Connection Error:</strong> Unable to connect to the WeTalk API. Please check your backend service.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>React Query Enabled:</strong> Featuring automatic caching, background updates, optimistic UI, and infinite scroll for messages.
              </p>
            </div>
          </div>
        </div>
        
        <WeTalkContainer />
      </div>
      {ReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default WeTalkDemo 