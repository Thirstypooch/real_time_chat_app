import React from 'react';
import { Conversation } from '../../types';
import UserStatus from './UserStatus';
import { useChat } from '../../context/ChatContext';

interface ContactItemProps {
  conversation: Conversation;
}

const ContactItem: React.FC<ContactItemProps> = ({ conversation }) => {
  const { activeConversation, setActiveConversation, currentUser, markAsRead } = useChat();
  
  // Get the other participant (not the current user)
  const contact = conversation.participants.find(p => p.id !== currentUser.id);
  
  if (!contact) return null;
  
  const isActive = activeConversation?.id === conversation.id;
  const hasUnread = conversation.unreadCount > 0;
  
  const handleClick = () => {
    setActiveConversation(conversation);
    if (hasUnread) {
      markAsRead(conversation.id);
    }
  };
  
  return (
    <div
      className={`flex items-center p-3 cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'bg-blue-50 dark:bg-gray-700' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      } rounded-lg`}
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={contact.avatar} 
          alt={contact.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0">
          <div 
            className={`h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${
              contact.status === 'online' 
                ? 'bg-green-500' 
                : contact.status === 'away' 
                  ? 'bg-yellow-500' 
                  : 'bg-gray-400'
            }`}
          />
        </div>
      </div>
      
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">{contact.name}</h3>
          {conversation.lastMessage && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-1">
          {conversation.lastMessage && (
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {conversation.lastMessage.senderId === currentUser.id ? 'You: ' : ''}
              {conversation.lastMessage.text}
            </p>
          )}
          
          {hasUnread && (
            <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;