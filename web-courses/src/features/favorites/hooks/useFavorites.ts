// hooks/useFavorites.ts
import { useState, useEffect, useCallback } from 'react';
import type { FavoritesStorage } from '@/features/favorites/lib/favoriteStorage';

export function useFavorites(storage: FavoritesStorage) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [, forceUpdate] = useState(0); // Trigger para forzar updates

  useEffect(() => {
    // Cargar inicial
    setFavorites(storage.get());

    // Escuchar cambios
    const handleUpdate = () => {
      const newFavorites = storage.get();
      console.log('Favorites updated:', newFavorites); // DEBUG
      setFavorites(newFavorites);
    };

    const unsubscribe = storage.subscribe(handleUpdate);
    return unsubscribe;
  }, []); // Dependencias vacías

  const isFavorite = useCallback((id: number) => {
    return favorites.includes(id);
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    console.log('Toggle called for:', id); // DEBUG
    console.log('Current favorites:', favorites); // DEBUG
    
    if (favorites.includes(id)) {
      storage.remove(id);
    } else {
      storage.add(id);
    }
    
    // Forzar actualización inmediata
    setFavorites(storage.get());
  }, [favorites, storage]);

  return { favorites, isFavorite, toggleFavorite };
}