import { useSigninMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/features/auth/authSlice';
import { signinSchema } from '@/schemas/auth/signinSchema';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signinSchema) });

  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await signin(data).unwrap();
      console.log(response);
      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      if (response.success) {
        toast.success(response.message);
      }
      navigate('/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <p>Loading.......</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('email')}
            placeholder="Email"
            className="w-full border p-2"
          />

          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className="w-full border p-2"
          />

          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={isLoading} className="border px-4 py-2">
          {isLoading ? 'Signing in...' : 'Signin'}
        </button>
      </form>
    </div>
  );
};

export default SigninPage;
