import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';
import apiClient from '../lib/axios';

interface GoogleAuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
}

export const useGoogleAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (credential: string) => {
      console.log('Sending Google credential to backend:', credential);
      
      const response = await apiClient.post('/auth/google', {
        credential: credential
      });
      
      console.log('Backend response:', response.data);
      return response.data as GoogleAuthResponse;
    },
    onSuccess: (data) => {
      console.log('Google authentication successful:', data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      addToast({
        type: 'success',
        title: 'Welcome!',
        message: 'You have successfully signed in with Google.',
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Google authentication failed:', error);
      addToast({
        type: 'error',
        title: 'Google sign in failed',
        message: error instanceof Error ? error.message : 'Please try again.',
      });
    },
  });
};