import  { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '../types';
import { Loader2 } from 'lucide-react';

const AuthCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setUser = useChatStore((state) => state.setUser);

    useEffect(() => {
        const token = searchParams.get('token');
        const userString = searchParams.get('user');

        if (token && userString) {
            try {
                const user: User = JSON.parse(decodeURIComponent(userString));

                localStorage.setItem('api_token', token);

                setUser(user);

                queryClient.setQueryData(['user'], user);

                navigate('/app');

            } catch (error) {
                console.error("Failed to parse user data from URL", error);
                navigate('/login?error=auth_failed');
            }
        } else {

            navigate('/login?error=missing_token');
        }
    }, [searchParams, navigate, setUser, queryClient]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white">
            <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
            <p className="mt-4 text-lg text-gray-300">Authenticating...  </p>
        </div>
    );
};

export default AuthCallbackPage;
