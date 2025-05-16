import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ApiChatMessage } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import ChatMessageDisplay from './ChatMessageDisplay';
import ChatInput from './ChatInput';

function GeminiChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSessionId(uuidv4());
        setMessages([
            {
                id: uuidv4(),
                role: 'system',
                text: 'Chat session started. Ask me anything!',
            },
        ]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (userInput: string) => {
        if (!userInput.trim()) return;

        const newUserMessage: ChatMessage = {
            id: uuidv4(),
            role: 'user',
            text: userInput,
        };
        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setIsLoading(true);

        const apiHistory: ApiChatMessage[] = messages
            .filter((msg) => msg.role === 'user' || msg.role === 'model')
            .map((msg) => ({
                role: msg.role as 'user' | 'model',
                parts: [{ text: msg.text }],
            }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userInput,
                    history: apiHistory,
                    sessionId: sessionId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'API request failed');
            }

            const data = await response.json();
            const aiReply: ChatMessage = {
                id: uuidv4(),
                role: 'model',
                text: data.reply,
            };
            setMessages((prevMessages) => [...prevMessages, aiReply]);
        } catch (error: any) {
            console.error('Failed to send message:', error);
            const errorMessage: ChatMessage = {
                id: uuidv4(),
                role: 'system',
                text: `Error: ${error.message || 'Could not connect to the AI.'}`,
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-gray-50 h-full max-w-full mx-auto" style={{
            maxWidth: '100%',
            minWidth: '320px',
            maxHeight: '600px',
            minHeight: '600px',
        }}>
            <div className="flex-grow overflow-y-auto px-4 pt-6 pb-32 space-y-4 flex flex-col mx-auto w-full">
                {messages.map((msg) => (
                    <ChatMessageDisplay key={msg.id} message={msg} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
    );
}

export default GeminiChat;
