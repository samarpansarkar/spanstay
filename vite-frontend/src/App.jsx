import MainLayout from './layouts/MainLayout';
import HomePage from './pages/home/HomePage';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';
import HotelsPage from './pages/hotels/HotelsPage';
import HotelDetailPage from './pages/hotels/HotelDetailPage';
import UsersProfilePage from './pages/users/UsersProfilePage';
import PaymentSuccessPage from './pages/checkout/PaymentSuccessPage';
import PaymentCancelPage from './pages/checkout/PaymentCancelPage';
import MyBookingsPage from './pages/bookings/MyBookingsPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
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
    </Routes>
  );
};

export default App;
