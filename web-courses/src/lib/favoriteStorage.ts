// lib/favoriteStorage.ts
const STORAGE_KEY = 'favorites';
const FAVORITES_EVENT = 'favoritesChanged';

export interface FavoritesStorage {
  get: () => number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  subscribe: (callback: () => void) => () => void;
}

export const localStorageFavorites: FavoritesStorage = {
  get: () => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  add: (id: number) => {
    if (typeof window === 'undefined') return;
    const favs = localStorageFavorites.get();
    if (!favs.includes(id)) {
      const newFavs = [...favs, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
      console.log('Added to favorites:', id, 'New array:', newFavs); // DEBUG
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    }
  },

  remove: (id: number) => {
    if (typeof window === 'undefined') return;
    const favs = localStorageFavorites.get();
    const newFavs = favs.filter(fav => fav !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavs));
    console.log('Removed from favorites:', id, 'New array:', newFavs); // DEBUG
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  },

  subscribe: (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    
    console.log('Subscribed to favorites changes'); // DEBUG
    window.addEventListener(FAVORITES_EVENT, callback);
    return () => {
      console.log('Unsubscribed from favorites changes'); // DEBUG
      window.removeEventListener(FAVORITES_EVENT, callback);
    };
  },
};