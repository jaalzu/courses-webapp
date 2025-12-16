// hooks/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';
import type { FavoritesStorage } from '@/features/favorites/lib/favoriteStorage';

export function useFavoriteIds(storage: FavoritesStorage) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    // Cargar inicial
    setFavorites(storage.get());

    // Escuchar cambios
    const handleUpdate = () => {
      const newFavorites = storage.get();
      setFavorites(newFavorites);
    };

    const unsubscribe = storage.subscribe(handleUpdate);
    return unsubscribe;
  }, []); 

  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id);
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    if (favorites.includes(id)) {
      storage.remove(id);
    } else {
      storage.add(id);
    }
    
  }, [favorites, storage]);

  return { favorites, isFavorite, toggleFavorite };
}