
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

  // Show any errors as toasts
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
    }
  }, [error, toast]);

  // Intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-opacity duration-500 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-4xl flex flex-col h-[90vh]">
        <Header />
        
        <div className="flex-grow overflow-hidden glass-panel rounded-2xl p-4 mb-4 flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto scrollbar-none pr-2 space-y-2"
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
