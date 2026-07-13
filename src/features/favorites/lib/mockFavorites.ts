import { getMockStore, mutateMockStore } from "@/shared/mock/store";

// Cache global para mock (similar a supabaseFavorites)
let mockGlobalCache: string[] = [];
let mockIsInitialLoaded = false;

export const __resetMockFavoritesInternalState = () => {
  mockGlobalCache = [];
  mockIsInitialLoaded = false;
};

export const mockFavorites = (userId: string) => {
  const FAVORITES_EVENT = `mockFavoritesChanged_${userId}`;

  const notify = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(FAVORITES_EVENT));
    }
  };

  return {
    get: () => mockGlobalCache,

    add: async (courseId: string) => {
      if (!mockGlobalCache.includes(courseId)) {
        mockGlobalCache = [...mockGlobalCache, courseId];
        notify();
        // Guardar en mock store
        mutateMockStore((s) => {
          if (
            !s.favorites.some(
              (f) => f.user_id === userId && f.course_id === courseId,
            )
          ) {
            s.favorites.push({ user_id: userId, course_id: courseId });
          }
        });
      }
    },

    remove: async (courseId: string) => {
      if (mockGlobalCache.includes(courseId)) {
        mockGlobalCache = mockGlobalCache.filter((id) => id !== courseId);
        notify();
        // Eliminar del mock store
        mutateMockStore((s) => {
          s.favorites = s.favorites.filter(
            (f) => !(f.user_id === userId && f.course_id === courseId),
          );
        });
      }
    },

    subscribe: (callback: () => void) => {
      if (!mockIsInitialLoaded) {
        const store = getMockStore();
        const userFavorites = store.favorites
          .filter((f) => f.user_id === userId)
          .map((f) => f.course_id);
        mockGlobalCache = userFavorites;
        mockIsInitialLoaded = true;
        notify();
      }

      if (typeof window !== "undefined") {
        window.addEventListener(FAVORITES_EVENT, callback);
        return () => window.removeEventListener(FAVORITES_EVENT, callback);
      }

      return () => {};
    },
  };
};
