import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import store from './app/store.js';
import AuthInitializer from './components/auth/AuthInitializer.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AuthInitializer>
            <Toaster richColors position="bottom-center" />
            <App />
          </AuthInitializer>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
