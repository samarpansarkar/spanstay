import { ClerkProvider } from "@clerk/clerk-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./app/store.js";
import AppErrorBoundary from "./components/errors/AppErrorBoundary.jsx";
import "./styles/global.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <HelmetProvider>
        <Provider store={store}>
          <AppErrorBoundary>
            <App />
          </AppErrorBoundary>
        </Provider>
      </HelmetProvider>
    </ClerkProvider>
  </StrictMode>,
);
