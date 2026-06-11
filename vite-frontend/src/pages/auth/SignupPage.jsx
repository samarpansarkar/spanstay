import { useSignupMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/features/auth/authSlice';
import { signupSchema } from '@/schemas/auth/signupSchema';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await signup(data).unwrap();
      console.log(response);
      if (response.success) {
        toast.success(response.message);
      }
      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.accessToken,
        })
      );
      navigate('/signin');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('name')}
            placeholder="Username"
            className="w-full border p-2"
          />

          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
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

export default SignupPage;
