import React, {useEffect, useState} from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import apiClient from '../../services/api';
import { useChatStore } from '../../stores/chatStore';
import ContactItem from './ContactItem';
import { Conversation } from '../../types';

const ContactList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
    const setConversations = useChatStore(state => state.setConversations);

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: () => apiClient.get('/conversations').then(response => response.data),
  });

    useEffect(() => {
        if (conversations) {
            setConversations(conversations);
        }
    }, [conversations, setConversations]);

  const filteredConversations = searchTerm.trim() === ''
    ? conversations
    : conversations.filter(conv => {
        const contact = conv.participants.find(p => p.id !== useChatStore.getState().currentUser?.id);
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
