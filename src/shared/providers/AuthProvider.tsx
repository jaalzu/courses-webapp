"use client";

import { useEffect, useRef } from "react";
import { supabase } from "@/shared/lib/supabase/client";
import { useAuthStore } from "@/features/auth/model/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);
  const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (useMocks) {
      return;
    }

    // En modo real, escuchar cambios de sesión de Supabase
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { checkAuth } = useAuthStore.getState();
        await checkAuth();
      } else if (event === "SIGNED_OUT") {
        useAuthStore.setState({
          currentUser: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [useMocks]);

  return <>{children}</>;
}
