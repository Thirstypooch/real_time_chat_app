import { create } from 'zustand';
import { User, Conversation } from '../types'; // You will define these types

interface ChatState {
    currentUser: User | null;
    conversations: Conversation[];
    activeConversationId: number | null;
    setUser: (user: User | null) => void;
    setConversations: (conversations: Conversation[]) => void;
    setActiveConversationId: (id: number | null) => void;
    // We will add more actions later, e.g., for adding new messages
}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    conversations: [],
    activeConversationId: null,
    setUser: (user) => set({ currentUser: user }),
    setConversations: (conversations) => set({ conversations }),
    setActiveConversationId: (id) => set({ activeConversationId: id }),
}));