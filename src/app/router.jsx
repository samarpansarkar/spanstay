import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import CheckoutPage from "@/pages/Checkout/CheckoutPage";
import HomePage from "@/pages/Home/HomePage";
import HotelDetailsPage from "@/pages/HotelDetails/HotelDetailsPage";
import HotelsPage from "@/pages/Hotels/HotelsPage";

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
]);

export default router;
