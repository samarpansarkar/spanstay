import { lazy } from "react";

const MainLayout = lazy(() => import("@/layouts/MainLayout"));

const DashboardLayout = lazy(() => import("@/layouts/DashboardLayout"));

const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));

const HomePage = lazy(() => import("@/pages/Home/HomePage"));

const HotelsPage = lazy(() => import("@/pages/Hotels/HotelsPage"));

const HotelDetailsPage = lazy(
  () => import("@/pages/HotelDetails/HotelDetailsPage"),
);

const CheckoutPage = lazy(() => import("@/pages/Checkout/CheckoutPage"));

const DashboardPage = lazy(() => import("@/pages/Dashboard/DashboardPage"));

const AdminPage = lazy(() => import("@/pages/Admin/AdminPage"));

export {
  AdminLayout,
  AdminPage,
  CheckoutPage,
  DashboardLayout,
  DashboardPage,
  HomePage,
  HotelDetailsPage,
  HotelsPage,
  MainLayout,
};
