import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api';
import {Message} from '../types';
import { AxiosError } from 'axios';

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

  return useMutation<Message, Error, SendMessageData>({
    mutationFn: (data: SendMessageData) =>
        conversationId
            ? apiClient.post(`/conversations/${conversationId}/messages`, data).then(response => response.data)
            : Promise.reject(new Error('No active conversation')),

    onSuccess: () => {
      if (conversationId) {
        void queryClient.invalidateQueries({ queryKey: ['messages', conversationId] });
        void queryClient.invalidateQueries({ queryKey: ['conversations'] });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 429) {
        error.message = "You've reached your daily message limit. Please try again tomorrow.";
      }
    }
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conversationId: number) =>
        apiClient.post(`/conversations/${ conversationId}/read`),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};