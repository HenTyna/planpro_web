import Head from 'next/head';
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, ApiChatMessage } from '@/types/chat';
import { v4 as uuidv4 } from 'uuid';
import ChatMessageDisplay from './ChatMessageDisplay';
import ChatInput from './ChatInput';
import { ChevronLeft, ChevronRight, Newspaper, NewspaperIcon, Plus, Trash } from 'lucide-react';
import addIcon from '@/public/asset/add.png';

function GeminiChat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [chatHistory, setChatHistory] = useState<{ id: string, title: string, messages: ChatMessage[] }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
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

            // Save to chat history after successful response
            if (messages.length === 1) { // First message in conversation
                const newChat = {
                    id: sessionId!,
                    title: userInput.slice(0, 30) + "...",
                    messages: [...messages, newUserMessage, aiReply]
                };
                setChatHistory(prev => [...prev, newChat]);
            }
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

    const handleAddNewMessage = () => {
        // Save current chat to history if it has more than just the initial system message
        if (messages.length > 1) {
            const currentChat = {
                id: sessionId!,
                title: messages[1]?.text?.slice(0, 30) + "..." || "New Chat", // Added safety for title
                messages: [...messages]
            };

            // Check if the current chat is already in the history
            const isAlreadyInHistory = chatHistory.some(chat => chat.id === sessionId);
            if (!isAlreadyInHistory) {
                setChatHistory(prev => [...prev, currentChat]);
            }
        }

        // Start new chat session and clear messages
        const newSessionId = uuidv4();
        setSessionId(newSessionId);
        setMessages([
            {
                id: uuidv4(),
                role: 'system',
                text: 'Chat session started. Ask me anything!',
            },
        ]);
    };

    const handleLoadHistory = (chatId: string) => {
        const selectedChat = chatHistory.find(chat => chat.id === chatId);
        if (selectedChat) {
            setSessionId(selectedChat.id);
            setMessages(selectedChat.messages);
        }
    };

    //handleDeleteHistory
    const handleDeleteHistory = (chatId: string) => {
        setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
    };

    return (
        <div className="flex h-full">
            
            {/* Sidebar */}
            <div className={`bg-gray-100 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
                <div className="p-4">
                    <button
                        onClick={handleAddNewMessage}
                        className="w-full flex items-center justify-center gap-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <Plus size={16} />
                        New Chat
                    </button>


                    <div className="mt-4 space-y-2">
                        {chatHistory.map((chat) => (
                            <div key={chat.id} className="flex items-center">
                                <button
                                    onClick={() => handleLoadHistory(chat.id)}
                                    className="flex-grow text-left p-2 hover:bg-gray-200 rounded truncate"
                                >
                                    {chat.title}
                                </button>
                                <button
                                    onClick={() => handleDeleteHistory(chat.id)}
                                    className="p-2 hover:bg-gray-200 rounded"
                                >
                                    <Trash size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Toggle Sidebar Button */}
            <div className="relative">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-8 top-4 z-10 p-2 bg-gray-200 rounded-r hover:bg-gray-300 transition-colors"
                >
                    {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50" style={{
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
        </div>
    );
}

export default GeminiChat;
