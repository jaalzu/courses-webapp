import { useAuthStore } from "@/features/auth/model/useAuthStore";
import { toast } from "sonner";

export const useAdminDemo = () => {
  const currentUser = useAuthStore((state) => state.currentUser);

  const isDemoAdmin = currentUser?.email === "admin@demo.com";

  const runIfAllowed = (action: () => void) => {
    if (isDemoAdmin) {
      toast.error("Acción deshabilitada", {
        description: "En el modo demo no puedes hacer esto!",
        duration: 4000,
      });
      return;
    }
    action();
  };

  return {
    isDemoAdmin,
    runIfAllowed,
  };
};
