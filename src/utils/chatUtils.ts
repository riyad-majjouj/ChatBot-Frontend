
import { useState, useEffect } from 'react';

export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = (content: string, sender: 'user' | 'ai') => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Simulate AI thinking
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate a response based on user input
      let response = '';
      
      if (content.toLowerCase().includes('hello') || content.toLowerCase().includes('hi')) {
        response = "Hello! It's nice to chat with you. How are you doing today?";
      } else if (content.toLowerCase().includes('how are you')) {
        response = "I'm functioning perfectly, thank you for asking! How can I assist you?";
      } else if (content.toLowerCase().includes('name')) {
        response = "I'm an AI assistant. You can call me Aurora if you'd like. What's on your mind?";
      } else if (content.toLowerCase().includes('thank')) {
        response = "You're welcome! I'm always here to help. Is there anything else you'd like to know?";
      } else if (content.toLowerCase().includes('help')) {
        response = "I'd be happy to help! I can answer questions, provide information, or just chat. What do you need assistance with?";
      } else if (content.toLowerCase().includes('bye') || content.toLowerCase().includes('goodbye')) {
        response = "Goodbye! Feel free to come back anytime you have questions or just want to chat.";
      } else {
        response = "That's an interesting point. I'm designed to have conversations like this. Is there something specific you'd like to explore further?";
      }
      
      // Add AI response
      addMessage(response, 'ai');
    } catch (err) {
      setError('Sorry, I encountered an error. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
  };
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
