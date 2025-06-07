

// ChatMessage.tsx
import React, { useEffect, useRef } from 'react';
import { MessageType, formatTime } from '../utils/chatUtils';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: MessageType;
  isLast: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLast }) => {
  const messageRef = useRef<HTMLDivElement>(null);

  // Automatic scrolling to the latest message when it appears
  useEffect(() => {
    if (isLast && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLast]);

  const isUser = message.sender === 'user';

  return (
    <div
      ref={messageRef}
      className={cn(
        "flex w-full mb-4 items-end",
        isUser ? "justify-end" : "justify-start",
        "animate-fade-in"
      )}
    >
      {/* Display AI icon if the message is not from user */}
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary" />
          </div>
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%]",
          isUser ? "chat-bubble-user" : "chat-bubble-ai"
        )}
      >
        <div className="text-sm sm:text-base">
          {message.content}
        </div>
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-right text-white/70" : "text-left text-foreground/50"
        )}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      
      {/* Display user icon if the message is from user */}
      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
            <User className="h-4 w-4 text-accent" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
