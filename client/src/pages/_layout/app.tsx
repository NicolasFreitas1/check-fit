import { isAxiosError } from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Header } from "@/components/header";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/axios";

export function AppLayout() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in", { replace: true });
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 401) {
            navigate("/sign-in", { replace: true });
          } else {
            throw error;
          }
        }
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate, isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
