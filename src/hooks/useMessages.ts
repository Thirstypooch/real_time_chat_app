import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api';
import { Message } from '../types';

interface SendMessageData {
  content: string;
}

export const useMessages = (conversationId: number | null) => {
  return useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: () =>
        conversationId
            ? apiClient.get(`/conversations/${conversationId}/messages`).then(response => response.data)
            : Promise.resolve([]),
    enabled: !!conversationId,
  });
};

export const useSendMessage = (conversationId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageData) =>
        conversationId
            ? apiClient.post(`/conversations/${conversationId}/messages`, data).then(response => response.data)
            : Promise.reject(new Error('No active conversation')),

    onSuccess: async () => {
      if (conversationId) {
        await queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        await queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
    },
  });
};