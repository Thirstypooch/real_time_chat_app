import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import UserStatus from '../Sidebar/UserStatus';

const ChatHeader: React.FC = () => {
  const { activeConversation, currentUser } = useChat();
  
  if (!activeConversation) return null;
  
  // Get the other participant (not the current user)
  const contact = activeConversation.participants.find(p => p.id !== currentUser.id);
  
  if (!contact) return null;
  
  return (
    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center justify-between">
      <div className="flex items-center">
        <img 
          src={contact.avatar} 
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        
        <div className="ml-3">
          <h2 className="font-medium text-gray-900 dark:text-white">{contact.name}</h2>
          <UserStatus user={contact} />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Voice call"
        >
          <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Video call"
        >
          <Video className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;