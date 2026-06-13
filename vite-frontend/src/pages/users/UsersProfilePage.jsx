import { useLogoutMutation } from '@/redux/api/authApi';
import { clearCredential } from '@/redux/features/auth/authSlice';
import { getErrorMessage } from '@/utils/getErrorMessage';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UsersProfilePage = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(clearCredential());
      toast.success('Logged out successfully');
      navigate('/signin');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      {user && (
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </div>
      )}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="border px-4 py-2"
      >
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  );
};

export default UsersProfilePage;
