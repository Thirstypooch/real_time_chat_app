import { create } from 'zustand';
import { User, Theme } from '../types';

interface ChatState {
    currentUser: User | null;
    activeConversationId: number | null;
    theme: Theme;
    setUser: (user: User | null) => void;
    setActiveConversationId: (id: number | null) => void;
    toggleTheme: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    activeConversationId: null,
    theme: 'light',
    setUser: (user) => set({ currentUser: user }),
    setActiveConversationId: (id) => set({ activeConversationId: id }),
    toggleTheme: () => set((state) => {
        const newTheme = state.theme ===  'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme ===  'dark');
        return { theme: newTheme };
    }),
}));
