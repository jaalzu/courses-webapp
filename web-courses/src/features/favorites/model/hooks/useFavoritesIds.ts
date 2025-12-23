// hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import type { FavoritesStorage } from '@/features/favorites/lib/favoriteStorage';
export function useFavoriteIds(storage: FavoritesStorage) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    setFavorites(storage.get());

    const unsubscribe = storage.subscribe(() => {
      setFavorites(storage.get());
    });

    return unsubscribe;
  }, [storage]);

  const isFavorite = (id: number) => favorites.includes(id);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      storage.remove(id);
    } else {
      storage.add(id);
    }
  };

  return { favorites, isFavorite, toggleFavorite };
}
