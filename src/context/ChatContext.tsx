import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Conversation, Message, Theme } from '../types';
import { currentUser, contacts, conversations as mockConversations } from '../data/mockData';

interface ChatContextType {
  currentUser: User;
  contacts: User[];
  conversations: Conversation[];
  activeConversation: Conversation | null;
  theme: Theme;
  setActiveConversation: (conversation: Conversation) => void;
  sendMessage: (text: string) => void;
  markAsRead: (conversationId: string) => void;
  toggleTheme: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Set the first conversation as active by default
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [conversations, activeConversation, theme]);

  const sendMessage = (text: string) => {
    if (!activeConversation) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      read: false,
    };
    
    // Update conversations with the new message
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === activeConversation.id 
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: newMessage,
            }
          : conv
      )
    );
    
    // Update active conversation
    setActiveConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage,
      };
    });
    
    // Simulate a reply after a random delay
    simulateReply(activeConversation);
  };
  
  const simulateReply = (conversation: Conversation) => {
    // Get the other participant
    const otherUser = conversation.participants.find(p => p.id !== currentUser.id);
    if (!otherUser) return;
    
    // Random delay between 1-3 seconds
    const delay = Math.floor(Math.random() * 2000) + 1000;
    
    setTimeout(() => {
      const replyMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: otherUser.id,
        text: `This is a reply from ${otherUser.name}`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === conversation.id 
            ? {
                ...conv,
                messages: [...conv.messages, replyMessage],
                lastMessage: replyMessage,
                unreadCount: conv.unreadCount + 1,
              }
            : conv
        )
      );
      
      // Update active conversation if it's the one that received the message
      setActiveConversation(prev => {
        if (!prev || prev.id !== conversation.id) return prev;
        return {
          ...prev,
          messages: [...prev.messages, replyMessage],
          lastMessage: replyMessage,
        };
      });
    }, delay);
  };
  
  const markAsRead = (conversationId: string) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === conversationId 
          ? {
              ...conv,
              unreadCount: 0,
              messages: conv.messages.map(msg => ({ ...msg, read: true })),
            }
          : conv
      )
    );
  };
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ChatContext.Provider 
      value={{
        currentUser,
        contacts,
        conversations,
        activeConversation,
        theme,
        setActiveConversation,
        sendMessage,
        markAsRead,
        toggleTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};