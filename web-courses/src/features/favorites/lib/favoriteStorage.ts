// lib/favoriteStorage.ts
const STORAGE_KEY = 'favorites';
const FAVORITES_EVENT = 'favoritesChanged';

export interface FavoritesStorage {
  get: () => string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  subscribe: (callback: () => void) => () => void;
}

//  Helper privado
const isServer = () => typeof window === 'undefined';

const getFromStorage = (): string[] => {
  if (isServer()) return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (favs: string[]): void => {
  if (isServer()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
  window.dispatchEvent(new Event(FAVORITES_EVENT));
};

//  API pública limpia
export const localStorageFavorites: FavoritesStorage = {
  get: getFromStorage,

  add: (id: string) => {
    const favs = getFromStorage();
    if (!favs.includes(id)) {
      saveToStorage([...favs, id]);
    }
  },

  remove: (id: string) => {
    const favs = getFromStorage();
    saveToStorage(favs.filter(fav => fav !== id));
  },

  subscribe: (callback: () => void) => {
    if (isServer()) return () => {};
    
    window.addEventListener(FAVORITES_EVENT, callback);
    return () => window.removeEventListener(FAVORITES_EVENT, callback);
  },
};