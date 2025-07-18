import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/app" element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
