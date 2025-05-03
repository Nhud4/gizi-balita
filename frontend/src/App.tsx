import "./app.css";

import React, { Suspense, useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { hot } from "react-hot-loader/root";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ErrorFallback from "./components/ErrorFallback";
import FallbackPage from "./components/FallbackPage";
import routes from "./routes";
import { getUserToken } from "./storage";

const App: React.FC = () => {
  useEffect(() => {
    const { location } = window;
    const data = getUserToken();
    if (location.pathname !== "/login" && !data) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <Suspense fallback={<FallbackPage />}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} element={route.component} path={route.path} />
        ))}
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        hideProgressBar
        closeButton={false}
      />
    </Suspense>
  );
};

const HotApp = hot(
  withErrorBoundary(App, { FallbackComponent: ErrorFallback })
);

export default HotApp;
