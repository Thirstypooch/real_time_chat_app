import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useChatStore } from './stores/chatStore';
import { useUser } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

function App() {
    const setUser = useChatStore((state) => state.setUser);
    const navigate = useNavigate();
    const { data: user, isLoading, isError } = useUser();

    useEffect(() => {
        if (user) {
            setUser(user);
        } else if (isError) {
            localStorage.removeItem('api_token');
            setUser(null);
            if (window.location.pathname.startsWith('/app')) {
                navigate('/login');
            }
        }
    }, [user, isError, setUser, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-900 text-white">
                <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
                <p className="mt-4 text-lg text-gray-300">Loading Session...</p>
            </div>
        );
    }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/app" element={
        <ProtectedRoute user={user}>
          <ChatPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
