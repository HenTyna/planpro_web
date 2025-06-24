import React from 'react'

const WeTalkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full opacity-20 animate-spin-slow"></div>
    </div>
  )
}

export default WeTalkBackground 