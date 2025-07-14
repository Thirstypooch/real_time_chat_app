import { create } from 'zustand';
import { User, Conversation, Theme } from '../types';

interface ChatState {
    currentUser: User | null;
    conversations: Conversation[];
    activeConversationId: number | null;
    theme: Theme;
    setUser: (user: User | null) => void;
    setConversations: (conversations: Conversation[]) => void;
    setActiveConversationId: (id: number | null) => void;
    toggleTheme: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    conversations: [],
    activeConversationId: null,
    theme: 'light',
    setUser: (user) => set({ currentUser: user }),
    setConversations: (conversations) => set({ conversations }),
    setActiveConversationId: (id) => set({ activeConversationId: id }),
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
    }),
}));
