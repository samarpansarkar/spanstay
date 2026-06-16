import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import Loader from './components/ui/Loader/Loader';

const HomePage = lazy(() => import('./pages/home/HomePage'));
const SigninPage = lazy(() => import('./pages/auth/SigninPage'));
const SignupPage = lazy(() => import('./pages/auth/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'));
const VerifyEmailPage = lazy(() => import('./pages/auth/VerifyEmailPage'));
const HotelsPage = lazy(() => import('./pages/hotels/HotelsPage'));
const HotelDetailPage = lazy(() => import('./pages/hotels/HotelDetailPage'));
const UsersProfilePage = lazy(() => import('./pages/users/UsersProfilePage'));
const PaymentSuccessPage = lazy(() => import('./pages/checkout/PaymentSuccessPage'));
const PaymentCancelPage = lazy(() => import('./pages/checkout/PaymentCancelPage'));
const MyBookingsPage = lazy(() => import('./pages/bookings/MyBookingsPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AboutPage = lazy(() => import('./pages/company/AboutPage'));
const CareersPage = lazy(() => import('./pages/company/CareersPage'));
const ConciergePage = lazy(() => import('./pages/company/ConciergePage'));

const App = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-container-lowest flex items-center justify-center"><Loader /></div>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/concierge" element={<ConciergePage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UsersProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment-cancel"
            element={
              <ProtectedRoute>
                <PaymentCancelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={<VerifyEmailPage />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default App;
