import { supabase } from '@/shared/lib/supabase/client';

// Cache global fuera de la función para que no se resetee al re-renderizar
let globalCache: string[] = [];
let isInitialLoaded = false;

export const __resetFavoritesInternalState = () => {
  globalCache = [];
  isInitialLoaded = false;
};

export const supabaseFavorites = (userId: string) => {
  const FAVORITES_EVENT = `supabaseFavoritesChanged_${userId}`;

  const notify = () => window.dispatchEvent(new Event(FAVORITES_EVENT));

  return {
    get: () => globalCache,

    add: async (courseId: string) => {
      if (!globalCache.includes(courseId)) {
        globalCache = [...globalCache, courseId];
        notify();
        await supabase.from('favorites').insert({ user_id: userId, course_id: courseId });
      }
    },

    remove: async (courseId: string) => {
      if (globalCache.includes(courseId)) {
        globalCache = globalCache.filter(id => id !== courseId);
        notify();
        await supabase.from('favorites').delete().eq('user_id', userId).eq('course_id', courseId);
      }
    },

    subscribe: (callback: () => void) => {
      if (!isInitialLoaded) {
        supabase.from('favorites').select('course_id').eq('user_id', userId)
          .then(({ data }) => {
            if (data) {
              globalCache = data.map(f => f.course_id);
              isInitialLoaded = true;
              notify(); // Avisamos a todos que la data real llegó
            }
          });
      }
      
      window.addEventListener(FAVORITES_EVENT, callback);
      return () => window.removeEventListener(FAVORITES_EVENT, callback);
    }
  };
};