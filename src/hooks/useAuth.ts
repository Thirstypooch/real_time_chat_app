import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import { useChatStore } from '../stores/chatStore';
import { User } from '../types';
import { useEffect } from 'react';

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
      setUser(data.user);
      navigate('/');
    },
  });
};

export const useUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: () => apiClient.get('/user').then((response) => response.data),
    retry: false,
  });
};

export const useSyncUser = () => {
  const { data: user } = useUser();
  const setUser = useChatStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);
}
