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
    const storage = currentUser?.id 
      ? supabaseFavorites(currentUser.id) 
      : localStorageFavorites;

    const sync = () => {
      setFavorites([...storage.get()]);
      setIsLoading(false);
    };

    sync();

    const unsubscribe = storage.subscribe(sync);

    return () => {
      unsubscribe();
    };
  }, [currentUser?.id]); 

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