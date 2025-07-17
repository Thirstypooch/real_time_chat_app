import React, { useRef, useEffect } from 'react';
import { useChatStore } from '../../stores/chatStore';
import { useMessages } from '../../hooks/useMessages';
import MessageBubble from './MessageBubble';
import { Message } from '../../types';
import { Loader2 } from 'lucide-react';


const MessageList: React.FC = () => {
  const activeConversationId = useChatStore(state => state.activeConversationId);
  const streamingMessage = useChatStore(state => state.streamingMessage);
  const { data: messages = [], isLoading, isError } = useMessages(activeConversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) {
    return (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-gray-500 animate-spin" />
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-500">Error loading messages.</p>
        </div>
    );
  }

  if (!activeConversationId) {
    return (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Select a conversation to start chatting</p>
        </div>
    );
  }

  return (
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message: Message, index: number) => (
            <MessageBubble
                key={message.id}
                message={message}
                isLast={index ===   messages.length - 1 && !streamingMessage}
            />
        ))}
          {streamingMessage && streamingMessage.conversationId ===   activeConversationId && (
              <MessageBubble
                  message={{
                      id: -1,
                      content: streamingMessage.content,
                      sender: streamingMessage.sender,
                      created_at: new Date().toISOString(),
                      senderId: streamingMessage.sender.id,
                      read: false,
                  }}
                  isLast={true}
              />
          )}
        <div ref={messagesEndRef} />
      </div>
  );
};

export default MessageList;
