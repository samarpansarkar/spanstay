import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import CheckoutPage from "@/pages/Checkout/CheckoutPage";
import DashboardPage from "@/pages/Dashboard/DashboardPage";
import HomePage from "@/pages/Home/HomePage";
import HotelDetailsPage from "@/pages/HotelDetails/HotelDetailsPage";
import HotelsPage from "@/pages/Hotels/HotelsPage";
import LoginPage from "@/pages/Login/LoginPage";
import SignupPage from "@/pages/Signup/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/hotels",
    element: <HotelsPage />,
  },
  {
    path: "/hotels/:hotelId",
    element: <HotelDetailsPage />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

export default router;
