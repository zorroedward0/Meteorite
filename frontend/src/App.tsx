import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import {
    SessionProvider,
    useSession,
} from "@/features/auth/context/AuthContext";
import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

function PrivateRoute({ children }: { children: ReactElement }) {

  const { mode } = useSession();
  if (!mode) {
    return <Navigate to="/" replace />;
  }

  return children;

}

export default function App() {

  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  );

}
