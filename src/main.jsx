import { ClerkProvider } from "@clerk/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./app/store.js";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider>
      <HelmetProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </HelmetProvider>
    </ClerkProvider>
  </StrictMode>,
);
