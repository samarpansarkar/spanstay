import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./app/routers/router";
import Loader from "./components/ui/Loader/Loader";

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
