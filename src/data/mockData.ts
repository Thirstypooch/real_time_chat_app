import { User, Conversation, Message } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  status: 'online',
};

export const contacts: User[] = [
  {
    id: 'user-2',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'online',
    lastActive: 'now'
  },
  {
    id: 'user-3',
    name: 'Alex Williams',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'offline',
    lastActive: '5h ago'
  },
  {
    id: 'user-4',
    name: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'away',
    lastActive: '2h ago'
  },
  {
    id: 'user-5',
    name: 'Michael Brown',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'online',
    lastActive: 'now'
  },
  {
    id: 'user-6',
    name: 'Olivia Smith',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'online',
    lastActive: 'now'
  }
];

// Generate messages for a conversation
const generateMessages = (senderId: string, recipientId: string): Message[] => {
  const messages: Message[] = [];
  const now = new Date();
  
  // Generate 10 messages
  for (let i = 0; i < 10; i++) {
    const timestamp = new Date(now);
    timestamp.setMinutes(now.getMinutes() - (10 - i) * 5);
    
    messages.push({
      id: `msg-${senderId}-${recipientId}-${i}`,
      senderId: i % 2 === 0 ? senderId : recipientId,
      text: i % 2 === 0 
        ? `This is a message from ${senderId} (${i+1})` 
        : `This is a reply from ${recipientId} (${i+1})`,
      timestamp: timestamp.toISOString(),
      read: i < 8, // Only the last 2 messages are unread
    });
  }
  
  return messages;
};

export const conversations: Conversation[] = contacts.map(contact => {
  const messages = generateMessages(currentUser.id, contact.id);
  return {
    id: `conv-${contact.id}`,
    participants: [currentUser, contact],
    messages,
    lastMessage: messages[messages.length - 1],
    unreadCount: messages.filter(m => !m.read && m.senderId !== currentUser.id).length,
  };
});