// components/ChatMessageDisplay.tsx
import { ChatMessage } from '@/types/chat';
import { Bot, BotIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface ChatMessageDisplayProps {
  message: ChatMessage;
}

const ChatMessageDisplay: React.FC<ChatMessageDisplayProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const isModel = message.role === 'model';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} py-2 px-4 items-start`}>
      {!isUser && (
        <div className="mr-2">
          {isModel && 
          <span className="text-indigo-500 text-xs">
            {/* <Image src="/icons/robot.png" alt="Robot" width={24} height={24} className="w-6 h-6" priority /> */}
            <BotIcon width={50} height={50} className="w-9 h-9" />
          </span>}
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-lg whitespace-pre-wrap break-words shadow-sm ${isUser
            ? 'bg-indigo-100 text-gray-800'
            : isSystem
              ? 'text-sm text-gray-600 italic'
              : 'bg-white text-gray-900 border border-gray-200'
          } p-3`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default ChatMessageDisplay;