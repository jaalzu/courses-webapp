import { redirect } from "next/navigation";
import { createClient } from "@/shared/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === "true";

  // En modo mock, no validar server-side (el cliente lo maneja)
  if (useMocks) {
    return <>{children}</>;
  }

  // --- CAMINO REAL ---
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
