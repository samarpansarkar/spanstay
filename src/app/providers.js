"use client";

import AppErrorBoundary from "components/errors/AppErrorBoundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "redux/store";

export default function Providers({ children }) {
  return (
    <HelmetProvider>
      <AppErrorBoundary>
        <Provider store={store}>{children}</Provider>;
      </AppErrorBoundary>
    </HelmetProvider>
  );
}
