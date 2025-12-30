// hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/model/useAuthStore';
import { supabaseFavorites } from '@/features/favorites/lib/supabaseFavorites';
import { localStorageFavorites } from '@/features/favorites/lib/favoriteStorage';

export function useFavoriteIds() {
  const currentUser = useAuthStore(state => state.currentUser);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Decidir qué storage usar
    const storage = currentUser?.id 
      ? supabaseFavorites(currentUser.id) 
      : localStorageFavorites;

    // 2. Función para sincronizar el estado de React con el "cache" del storage
    const sync = () => {
      setFavorites([...storage.get()]);
      setIsLoading(false);
    };

    // 3. Sincronización inicial
    sync();

    // 4. Suscribirse a cambios (y que el storage se encargue de avisar cuando cargue de la DB)
    const unsubscribe = storage.subscribe(sync);

    return () => {
      unsubscribe();
    };
  }, [currentUser?.id]); // Si el usuario cambia, reiniciamos el flujo

  const toggleFavorite = async (id: string) => {
    const storage = currentUser?.id 
      ? supabaseFavorites(currentUser.id!) 
      : localStorageFavorites;
    
    if (favorites.includes(id)) {
      await storage.remove(id);
    } else {
      await storage.add(id);
    }
  };

  return { 
    favorites, 
    isFavorite: (id: string) => favorites.includes(id), 
    toggleFavorite,
    isLoading 
  };
}