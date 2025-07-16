import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types';
import { useChatStore } from '../../stores/chatStore';

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const currentUser = useChatStore(state => state.currentUser);
  const isCurrentUser = currentUser && String(message.sender.id) ===   String(currentUser.id);

  console.log({
    messageContent: message.content,
    messageSenderId: message.sender.id,
    currentUserId: currentUser?.id,
    isCurrentUser,
  });

  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isCurrentUser 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
        }`}
      >
        <p className="text-sm mb-1">{message.content}</p>
        <div className="flex items-center justify-end space-x-1 text-xs">
          <span className={isCurrentUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}>
            {formattedTime}
          </span>

          {isCurrentUser && (
            <span className="ml-1">
              {message.read ? (
                <CheckCheck className="h-3.5 w-3.5 text-blue-100" />
              ) : (
                <Check className="h-3.5 w-3.5 text-blue-100" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
