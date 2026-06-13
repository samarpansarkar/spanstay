import useAuth from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtctedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtctedRoute;
