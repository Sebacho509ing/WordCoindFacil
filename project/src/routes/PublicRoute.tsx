import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return !currentUser ? <>{children}</> : <Navigate to="/" replace />;
};