// Index.tsx
import React, { useRef, useEffect, useState } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import Header from '@/components/Header';
import { useChat } from '@/utils/chatUtils';
import { Bot, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { toast } = useToast();

  // Display errors using Toasts
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  // Initial load effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to the last message when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-opacity duration-500 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-4xl flex flex-col h-[90vh]">
        <Header />

        <div className="flex-grow overflow-hidden glass-panel rounded-2xl p-4 mb-4 flex flex-col">
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto scrollbar-2 [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:transition-colors
                          [&::-webkit-scrollbar-thumb]:hover:bg-gray-500
                          [&::-webkit-scrollbar]:bg-transparent
                          [&::-webkit-scrollbar-track]:rounded-full
                          [&::-webkit-scrollbar-track]:bg-transparent
                         [&::-webkit-scrollbar-track]:bg-gray-700 
                         [&::-webkit-scrollbar-thumb]:bg-gray-600
                         dark:[&::-webkit-scrollbar-track]:bg-neutral-200
                           dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 pr-2 space-y-2"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 animate-bounce-subtle">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Welcome to Aurora AI</h2>
                <p className="text-muted-foreground max-w-md">
                  Start a conversation with your intelligent AI assistant. Ask anything or seek help with various tasks.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLast={index === messages.length - 1}
                />
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 p-4 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="h-4 w-4 text-primary animate-spin" />
                </div>
                <div className="chat-bubble-ai py-2 px-4">
                  <div className="h-5 w-24 shimmer rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ChatInput will send messages through sendMessage and update the messages array automatically */}
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={isLoading}
          placeholder="Message Aurora AI..."
        />

        <div className="text-xs text-center text-muted-foreground mt-2">
          Aurora AI Assistant • Providing intelligent responses
        </div>
      </div>
    </div>
  );
};

export default Index;
