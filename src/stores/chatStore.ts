import { create } from 'zustand';
import { User, Theme } from '../types';

interface StreamingMessage {
    content: string;
    sender: User;
    conversationId: number;
}

interface ChatState {
    currentUser: User | null;
    activeConversationId: number | null;
    theme: Theme;
    streamingMessage: StreamingMessage | null;
    setUser: (user: User | null) => void;
    setActiveConversationId: (id: number | null) => void;
    toggleTheme: () => void;
    setStreamingMessage: (message: StreamingMessage | null) => void;
    appendStreamingMessage: (chunk: string) => void;
    onlineUserIds: number[];
    setOnlineUsers: (userIds: number[]) => void;
    addOnlineUser: (userId: number) => void;
    removeOnlineUser: (userId: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    activeConversationId: null,
    theme: 'light',
    streamingMessage: null,
    setUser: (user) => set({ currentUser: user }),
    setActiveConversationId: (id) => set({ activeConversationId: id }),
    toggleTheme: () => set((state) => {
        const newTheme = state.theme ===  'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme ===  'dark');
        return { theme: newTheme };
    }),
    setStreamingMessage: (message) => set({ streamingMessage: message }),
    appendStreamingMessage: (chunk) => set((state) => {
        if (!state.streamingMessage) return {};
        return {
            streamingMessage: {
                ...  state.streamingMessage,
                content: state.streamingMessage.content + chunk,
            },
        };
    }),
    onlineUserIds: [],
    setOnlineUsers: (userIds) => set({ onlineUserIds: userIds }),
    addOnlineUser: (userId) => set((state) => ({
        onlineUserIds: [...new Set([...state.onlineUserIds, userId])]
    })),
    removeOnlineUser: (userId) => set((state) => ({
        onlineUserIds: state.onlineUserIds.filter(id => id !== userId)
    })),
}));
