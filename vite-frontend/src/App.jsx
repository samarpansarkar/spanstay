import MainLayout from './layouts/MainLayout';
import HomePage from './pages/home/HomePage';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';
import HotelsPage from './pages/hotels/HotelsPage';
import UsersProfilePage from './pages/users/UsersProfilePage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UsersProfilePage />
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
