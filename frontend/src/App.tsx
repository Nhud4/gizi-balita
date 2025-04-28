import { Routes, Route } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import { hot } from "react-hot-loader/root";
import React, { Suspense } from "react";
import routes from "./routes";

function FallbackPage() {
  return <div>Hey Hey</div>;
}

function ErrorFallback() {
  return <div>Error</div>;
}

const App: React.FC = () => {
  return (
    <Suspense fallback={<FallbackPage />}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} element={route.component} path={route.path} />
        ))}
      </Routes>
    </Suspense>
  );
};

const HotApp = hot(
  withErrorBoundary(App, { FallbackComponent: ErrorFallback })
);

export default HotApp;
