import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import ContactItem from './ContactItem';

const ContactList: React.FC = () => {
  const { conversations } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = searchTerm.trim() === ''
    ? conversations
    : conversations.filter(conv => {
        const contact = conv.participants.find(p => p.id !== 'user-1');
        return contact?.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-3">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Search contacts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredConversations.map(conversation => (
            <ContactItem key={conversation.id} conversation={conversation} />
          ))}
          
          {filteredConversations.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No contacts found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;