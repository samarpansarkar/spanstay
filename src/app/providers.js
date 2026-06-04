"use client";

import AppErrorBoundary from "@/components/errors/AppErrorBoundary";
import store from "@/redux/store";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  return (
    <HelmetProvider>
      <AppErrorBoundary>
        <Provider store={store}>{children}</Provider>;
      </AppErrorBoundary>
    </HelmetProvider>
  );
}
