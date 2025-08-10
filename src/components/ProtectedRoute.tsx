import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  user: User | undefined | null;
}

const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <> {children}</>;
};

export default ProtectedRoute;