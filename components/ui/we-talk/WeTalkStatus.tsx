import React from 'react'
import { Wifi, WifiOff, AlertCircle, RefreshCw, CheckCircle, TestTube } from 'lucide-react'

interface WeTalkStatusProps {
  isConnected: boolean
  connectionError: string | null
  onRetry?: () => void
  isTyping: boolean
  typingUsers: string[]
}

const WeTalkStatus: React.FC<WeTalkStatusProps> = ({
  isConnected,
  connectionError,
  onRetry,
  isTyping,
  typingUsers
}) => {
  const [isTesting, setIsTesting] = React.useState(false)

  const handleTestEndpoints = async () => {
    setIsTesting(true)
    try {
      // await testWebSocketEndpoints()
    } catch (error) {
      console.error('Endpoint test failed:', error)
    } finally {
      setIsTesting(false)
    }
  }

  const getStatusColor = () => {
    if (connectionError) return 'text-red-600'
    if (isConnected) return 'text-green-600'
    return 'text-orange-600'
  }

  const getStatusIcon = () => {
    if (connectionError) return <AlertCircle className="w-4 h-4" />
    if (isConnected) return <CheckCircle className="w-4 h-4" />
    return <WifiOff className="w-4 h-4" />
  }

  const getStatusText = () => {
    if (connectionError) return 'Connection Error'
    if (isConnected) return 'Connected'
    return 'Connecting...'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-4 min-w-[280px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">WeTalk Status</h3>
          <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-xs font-medium">{getStatusText()}</span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">WebSocket:</span>
            <span className={getStatusColor()}>
              {isConnected ? 'Live' : connectionError ? 'Error' : 'Offline'}
            </span>
          </div>

          {/* Typing Status */}
          {typingUsers.length > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Typing:</span>
              <span className="text-purple-600">
                {typingUsers.length === 1 
                  ? `${typingUsers[0]} is typing...`
                  : `${typingUsers.join(', ')} are typing...`
                }
              </span>
            </div>
          )}

          {/* Error Details */}
          {connectionError && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-red-700 font-medium">Connection Failed</p>
                  <p className="text-red-600 mt-1">{connectionError}</p>
                  <div className="flex space-x-2 mt-2">
                    {onRetry && (
                      <button
                        onClick={onRetry}
                        className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    )}
                    <button
                      onClick={handleTestEndpoints}
                      disabled={isTesting}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
                    >
                      <TestTube className="w-3 h-3" />
                      <span>{isTesting ? 'Testing...' : 'Test Endpoints'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Connection Info */}
          {!connectionError && (
            <div className="mt-3 p-2 bg-gray-50 border border-gray-200 rounded text-xs">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={getStatusColor()}>
                    {isConnected ? 'Real-time messaging enabled' : 'Using fallback polling'}
                  </span>
                </div>
                {isConnected && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Protocol:</span>
                    <span className="text-green-600">STOMP over SockJS</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WeTalkStatus 