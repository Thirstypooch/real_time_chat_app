import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import { useChatStore } from '../stores/chatStore';
import { User } from '../types';
import { updateEchoToken } from '../services/echo';


interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const setUser = useChatStore((state) => state.setUser);

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: (credentials) =>
        apiClient.post<LoginResponse>('/login', credentials).then((response) => response.data),
    onSuccess: (data) => {
      localStorage.setItem('api_token', data.token);
      updateEchoToken(data.token);
      setUser(data.user);
      navigate('/app');
    },
  });
};

export const useUser = () => {
  const token = localStorage.getItem('api_token');
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: () => apiClient.get('/user').then((response) => response.data),
    retry: false,
    enabled: !!token,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setUser = useChatStore(state => state.setUser);
  const setActiveConversationId = useChatStore(state => state.setActiveConversationId);

  return useMutation({
    mutationFn: () => apiClient.post('/logout'),
    onSuccess: () => {
      navigate('/login');
      localStorage.removeItem('api_token');
      updateEchoToken(null);
      setUser(null);
      setActiveConversationId(null);
      queryClient.removeQueries();
    },
    onError: () => {
      localStorage.removeItem('api_token');
      updateEchoToken(null);
      setUser(null);
      setActiveConversationId(null);
      queryClient.clear();
      navigate('/login');
    }
  });
}
