import { Route, Routes } from 'react-router-dom';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';
import UsersProfilePage from './pages/users/UsersProfilePage';
import ProtctedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>home Page</h1>} />
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
        path="/profile"
        element={
          <ProtctedRoute>
            <UsersProfilePage />
          </ProtctedRoute>
        }
      />
    </Routes>
  );
};

export default App;
