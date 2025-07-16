export interface User {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastActive?: string;
}

export interface Message {
  id: number;
  senderId: number;
  content: string;
  created_at: string;
  read: boolean;
  sender: User;
}

export interface Conversation {
  id: number;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

export type Theme = 'light' | 'dark';