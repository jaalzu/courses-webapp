import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que la data se considera "fresca" (no re-fetch automático)
      staleTime: 5 * 60 * 1000, // 5 minutos
      
      // Tiempo que la data se mantiene en cache
      gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)
      
      // Re-fetch cuando la ventana recupera el foco
      refetchOnWindowFocus: false,
      
      // Re-fetch cuando se reconecta a internet
      refetchOnReconnect: true,
      
      // Retry en caso de error
      retry: 1,
      
      // Función de retry
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Retry para mutaciones
      retry: 0, // No reintentar mutaciones por defecto
    },
  },
});