import { createBrowserRouter } from "react-router-dom";

import {
  AdminLayout,
  AdminPage,
  CheckoutPage,
  DashboardLayout,
  DashboardPage,
  HomePage,
  HotelDetailsPage,
  HotelsPage,
  MainLayout,
} from "./routes";

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
    path: "/admin",

    element: <AdminLayout />,

    children: [
      {
        index: true,

        element: <AdminPage />,
      },
    ],
  },
]);

export default router;
