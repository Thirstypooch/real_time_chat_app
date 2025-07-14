import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const currentUser = useChatStore(state => state.currentUser);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;