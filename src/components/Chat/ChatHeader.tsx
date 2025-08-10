import React from 'react';
import { Phone, Video, MoreVertical } from 'lucide-react';
import { useChatStore } from '../../stores/chatStore';
import UserStatus from '../Sidebar/UserStatus';
import {Conversation, User} from '../../types';
import {useQuery} from "@tanstack/react-query";
import apiClient from "../../services/api.ts";

const ChatHeader: React.FC = () => {
  const currentUser = useChatStore(state => state.currentUser);
  const activeConversationId = useChatStore(state => state.activeConversationId);

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: () => apiClient.get('/conversations').then(response => response.data),
    enabled: !!currentUser,
  });

  const activeConversation = conversations.find(
      (c) => c.id.toString() ===   activeConversationId?.toString()
  );

  if (!activeConversation || !currentUser) {
    return null;
  }

  const contact = activeConversation.participants.find(
      (p: User) => p.id !==   currentUser.id
  );
  if (!contact) {
    return null;
  }

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
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Voice call">
            <Phone className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Video call">
            <Video className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="More options">
            <MoreVertical className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
  );
};

export default ChatHeader;