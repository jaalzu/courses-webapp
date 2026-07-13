import { forumQueries as realForumQueries } from "@/shared/lib/supabase/queries/forum";
import { forumQueries as mockForumQueries } from "@/shared/mock/queries/forum";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const forumQueries = USE_MOCKS ? mockForumQueries : realForumQueries;

export const forumApi = {
  async getPosts(courseId: string) {
    const { data, error } = await forumQueries.getPosts(courseId);
    if (error) throw new Error(error.message);
    return data || [];
  },

  async createPost(courseId: string, userId: string, content: string) {
    const { data, error } = await forumQueries.createPost(
      courseId,
      userId,
      content,
    );
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No se pudo crear la publicación");
    return data;
  },

  async deletePost(postId: string) {
    const { error } = await forumQueries.deletePost(postId);
    if (error) throw new Error(error.message);
  },

  async createComment(postId: string, userId: string, content: string) {
    const { data, error } = await forumQueries.createComment(
      postId,
      userId,
      content,
    );
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No se pudo crear el comentario");
    return data;
  },

  async deleteComment(commentId: string) {
    const { error } = await forumQueries.deleteComment(commentId);
    if (error) throw new Error(error.message);
  },

  async getPostCourseId(postId: string) {
    if (USE_MOCKS) {
      return await (mockForumQueries as any).getPostCourseId(postId);
    }
    return null;
  },
};
