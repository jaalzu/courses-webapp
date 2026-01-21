import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { toast } from 'sonner'; // O la librería que uses para notificaciones

export const useAdminDemo = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  
  // Definimos quién es el admin de prueba
  const isDemoAdmin = currentUser?.email === 'admin@demo.com';

  // Esta función envuelve cualquier acción sensible
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
    runIfAllowed
  };
};