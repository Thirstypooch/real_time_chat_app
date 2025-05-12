import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, activeConversation } = useChat();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !activeConversation) return;
    
    sendMessage(message.trim());
    setMessage('');
  };
  
  if (!activeConversation) return null;
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900"
    >
      <div className="flex items-center space-x-2">
        <button 
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Attach files"
        >
          <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:ring-blue-500 focus:outline-none text-gray-900 dark:text-white"
          />
          
          <button 
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Add emoji"
          >
            <Smile className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        
        <button 
          type="submit"
          disabled={!message.trim()}
          className={`p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors ${
            !message.trim() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Send message"
        >
          <Send className="h-5 w-5 text-white" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;