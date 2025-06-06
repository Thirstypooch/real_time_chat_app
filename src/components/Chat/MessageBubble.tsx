import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { Message } from '../../types';
import { useChat } from '../../context/ChatContext';

interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast }) => {
  const { currentUser } = useChat();
  const isCurrentUser = message.senderId === currentUser.id;
  
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], { 
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
        <p className="text-sm mb-1">{message.text}</p>
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