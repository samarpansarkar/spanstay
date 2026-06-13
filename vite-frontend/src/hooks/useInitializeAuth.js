import {
  useLazyGetProfileQuery,
  useRefreshTokenMutation,
} from '@/redux/api/authApi';
import { setAccessToken, setCredentials } from '@/redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  const [refreshToken] = useRefreshTokenMutation();
  const [getProfile] = useLazyGetProfileQuery();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const refreshResponse = await refreshToken().unwrap();
        const accessToken = refreshResponse?.data?.accessToken;

        if (!accessToken) {
          return;
        }

        dispatch(setAccessToken(accessToken));

        const profileResponse = await getProfile().unwrap();

        dispatch(
          setCredentials({
            user: profileResponse.data,
            accessToken,
          })
        );
      } catch {
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [dispatch, refreshToken, getProfile]);

  return { isInitializing };
};

export default useInitializeAuth;
