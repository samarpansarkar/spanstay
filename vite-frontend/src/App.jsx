import MainLayout from './layouts/MainLayout';
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
        <Route path="/" element={<h1 className="text-white text-4xl font-bold p-10">Home Page</h1>} />
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
