import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const LoginPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <Section className="min-h-screen bg-slate-50">
      <Container>
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold">Welcome Back</h1>

            <p className="mt-3 text-slate-500">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
            />

            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none focus:border-primary"
            />

            <Button type="submit" size="lg" className="w-full">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary">
              Signup
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default LoginPage;
