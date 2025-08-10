import { useEffect } from 'react';
import { useChatStore } from '../stores/chatStore';
import echo from '../services/echo';
import { User } from '../types';

interface PresenceUser extends User {
    id: number;
}

export const usePresenceChannel = () => {
    const {
        currentUser,
        setOnlineUsers,
        addOnlineUser,
        removeOnlineUser
    } = useChatStore();

    useEffect(() => {
        if (!currentUser) return;

        const channel = echo.join('global-presence');

        channel
            .here((users: PresenceUser[]) => {
                console.log('Currently online:', users);
                setOnlineUsers(users.map(u => u.id));
            })
            .joining((user: PresenceUser) => {
                console.log('User joining:', user);
                addOnlineUser(user.id);
            })
            .leaving((user: PresenceUser) => {
                console.log('User leaving:', user);
                removeOnlineUser(user.id);
            });

        return () => {
            echo.leave('global-presence');
        };

    }, [currentUser, setOnlineUsers, addOnlineUser, removeOnlineUser]);
};