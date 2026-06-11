import { useSelector } from 'react-redux';
import {
  selectAccessToken,
  selectCurrentUser,
  selectIsAuthenticated,
} from '../redux/features/auth/authSelectors';

const useAuth = () => {
  const user = useSelector(selectCurrentUser);
  const accessToken = useSelector(selectAccessToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return { user, accessToken, isAuthenticated };
};

export default useAuth;
