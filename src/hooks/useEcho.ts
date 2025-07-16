import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import echo from '../services/echo';
import { Message } from '../types';

export const useEcho = (conversationId: number | null) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let previousChannel: string | null = null;
    if (conversationId) {
      const channelName = `conversation.${conversationId}`;
      previousChannel = channelName;
      echo.private(channelName)
          .listen('.App\\Events\\MessageSent', (e: { message: Message }) => {
              queryClient.setQueryData(
                  ['messages', conversationId],
                  (oldData: Message[] | undefined) => {
                      if (!oldData) {
                          return [e.message];
                      }
                      const messageExists = oldData.some(msg => msg.id ===   e.message.id);
                      if (messageExists) {
                          return oldData;
                      }
                      return [...oldData, e.message];
                  }
              );
            void queryClient.invalidateQueries({ queryKey: ['conversations'] });
          });
    }
    return () => {
      if (previousChannel) {
        echo.leave(previousChannel);
      }
    };
  }, [conversationId, queryClient]);
};