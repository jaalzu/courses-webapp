import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase/client";
import { toast } from "sonner";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

export function useGrantAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      courseId,
    }: {
      userId: string;
      courseId: string;
    }) => {
      if (USE_MOCKS) {
        toast.error("No disponible en modo mock");
        throw new Error("Grant access no disponible en mock");
      }

      const { error } = await (supabase.rpc as any)("grant_course_access", {
        target_user_id: userId,
        target_course_id: courseId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-access"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}

export function useRevokeAccess() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      courseId,
    }: {
      userId: string;
      courseId: string;
    }) => {
      if (USE_MOCKS) {
        toast.error("No disponible en modo mock");
        throw new Error("Revoke access no disponible en mock");
      }

      const { error } = await (supabase.rpc as any)("revoke_course_access", {
        target_user_id: userId,
        target_course_id: courseId,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-access"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
