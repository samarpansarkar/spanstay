import { Route, Routes } from 'react-router-dom';
import SigninPage from './pages/auth/SigninPage';
import SignupPage from './pages/auth/SignupPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>home Page</h1>} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default App;
