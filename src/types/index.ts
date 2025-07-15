export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastActive?: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  created_at: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export type Theme = 'light' | 'dark';