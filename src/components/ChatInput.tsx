
import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, PlusCircle, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  placeholder = "Type a message...",
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + "px";
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full glass-panel p-2 rounded-2xl flex items-end"
    >
      <button 
        type="button" 
        className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full"
        aria-label="Add attachment"
      >
        <PlusCircle className="h-5 w-5" />
      </button>
      <div className="relative flex-grow">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="w-full py-2 px-3 bg-transparent border-none glass-input rounded-xl resize-none outline-none text-foreground placeholder-muted-foreground focus:ring-0"
          style={{ maxHeight: '120px', minHeight: '40px' }}
        />
      </div>
      <div className="flex items-center">
        <button 
          type="button" 
          className="text-muted-foreground hover:text-accent transition-colors p-2 rounded-full"
          aria-label="Voice input"
        >
          <Mic className="h-5 w-5" />
        </button>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={cn(
            "ml-1 p-2 rounded-full transition-all duration-200",
            message.trim() && !isLoading 
              ? "bg-accent text-white hover:bg-accent/80" 
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
          aria-label="Send message"
        >
          <SendIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
