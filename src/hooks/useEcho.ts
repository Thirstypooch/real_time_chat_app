import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import echo from '../services/echo';
import { Message, AIChunkEvent } from '../types';
import { useChatStore } from '../stores/chatStore';

export const useEcho = (conversationId: number | null) => {
  const queryClient = useQueryClient();
  const { setStreamingMessage, appendStreamingMessage, streamingMessage } = useChatStore();

  useEffect(() => {
    let previousChannel: string | null = null;
    if (conversationId) {
      const channelName = `conversation.${conversationId}`;
      previousChannel = channelName;
      echo.private(channelName)
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
  }, [conversationId, queryClient, setStreamingMessage, appendStreamingMessage, streamingMessage]);
};