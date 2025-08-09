import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import echo from '../services/echo';
import { Message, AIChunkEvent } from '../types';
import { useChatStore } from '../stores/chatStore';

export const useEcho = (conversationId: number | null) => {
  const queryClient = useQueryClient();
  const { setStreamingMessage, appendStreamingMessage, streamingMessage, setOnlineUsers, addOnlineUser, removeOnlineUser  } = useChatStore();

  useEffect(() => {
    if (conversationId) {
        const channelName = `conversation.${conversationId}`;
        echo.join(channelName)
            .here((users: Array<{ id: number }>) => {
                // This runs when you first successfully join the channel
                setOnlineUsers(users.map(u => u.id));
            })
            .joining((user: { id: number }) => {
                // This runs when a new user joins the channel
                addOnlineUser(user.id);
            })
            .leaving((user: { id: number }) => {
                // This runs when a user leaves the channel
                removeOnlineUser(user.id);
            })
            .listen('.App\\Events\\AIResponseChunkSent', (e: AIChunkEvent) => {
                if (e.isFirstChunk) {
                    setStreamingMessage({
                        content: e.chunk,
                        sender: e.sender,
                        conversationId: e.conversationId,
                    });
                } else {
                    appendStreamingMessage(e.chunk);
                }
            })

            .listen('.App\\Events\\MessageSent', (e: { message: Message }) => {
                if (streamingMessage && e.message.sender.id === streamingMessage.sender.id) {
                    setStreamingMessage(null);
                }
                queryClient.setQueryData(
                    ['messages', conversationId],
                    (oldData: Message[] | undefined) => {
                        if (!oldData) {
                            return [e.message];
                        }
                        const messageExists = oldData.some(msg => msg.id === e.message.id);
                        if (messageExists) {
                            return oldData;
                        }
                        return [...oldData, e.message];
                    }
                );
                void queryClient.invalidateQueries({queryKey: ['conversations']});
            });

        return () => {
            echo.leave(channelName);
        };
    }
  }, [conversationId, queryClient, setStreamingMessage, appendStreamingMessage, streamingMessage, setOnlineUsers, addOnlineUser, removeOnlineUser]);
};