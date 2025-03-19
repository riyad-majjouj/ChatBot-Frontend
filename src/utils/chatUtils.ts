
import { useState, useEffect } from 'react';
import { sendMessageToGemini } from '@/services/geminiService';

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
    
    // Set loading state while waiting for AI response
    setIsLoading(true);
    setError(null);
    
    try {
      // Get response from Gemini API
      const response = await sendMessageToGemini(content);
      
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
