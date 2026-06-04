"use client";

import AppErrorBoundary from "@/components/errors/AppErrorBoundary";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Providers({ children }) {
  return (
    <AppErrorBoundary>
      <Provider store={store}>{children}</Provider>
    </AppErrorBoundary>
  );
}
