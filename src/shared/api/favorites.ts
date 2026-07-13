import { supabase } from "@/shared/lib/supabase/client";
import { getMockStore, mutateMockStore } from "@/shared/mock/store";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export const favoritesApi = {
  async isFavorite(userId: string, courseId: string): Promise<boolean> {
    if (USE_MOCKS) {
      const store = getMockStore();
      return store.favorites.some(
        (f) => f.user_id === userId && f.course_id === courseId,
      );
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("course_id", courseId)
      .single();

    if (error) return false;
    return !!data;
  },

  async getFavorites(userId: string): Promise<string[]> {
    if (USE_MOCKS) {
      const store = getMockStore();
      return store.favorites
        .filter((f) => f.user_id === userId)
        .map((f) => f.course_id);
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("course_id")
      .eq("user_id", userId);

    if (error) return [];
    return (data || []).map((f) => f.course_id);
  },

  async addFavorite(userId: string, courseId: string): Promise<void> {
    if (USE_MOCKS) {
      mutateMockStore((s) => {
        if (
          !s.favorites.some(
            (f) => f.user_id === userId && f.course_id === courseId,
          )
        ) {
          s.favorites.push({ user_id: userId, course_id: courseId });
        }
      });
      return;
    }

    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: userId, course_id: courseId });

    if (error) throw new Error(error.message);
  },

  async removeFavorite(userId: string, courseId: string): Promise<void> {
    if (USE_MOCKS) {
      mutateMockStore((s) => {
        s.favorites = s.favorites.filter(
          (f) => !(f.user_id === userId && f.course_id === courseId),
        );
      });
      return;
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("course_id", courseId);

    if (error) throw new Error(error.message);
  },
};
