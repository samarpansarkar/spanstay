import { Route, Routes } from 'react-router-dom';
import SigninPage from './pages/auth/SigninPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>home Page</h1>} />
      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  );
};

export default App;
