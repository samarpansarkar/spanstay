import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-8xl font-bold text-primary">404</h1>

      <h2 className="mt-6 text-3xl font-bold">Page Not Found</h2>

      <p className="mt-4 max-w-md text-slate-500">
        The page you are looking for does not exist.
      </p>

      <Link to="/">
        <Button className="mt-8">Back To Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
