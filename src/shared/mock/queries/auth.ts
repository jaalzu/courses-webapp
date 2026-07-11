import { delay, generateId, getMockStore, mutateMockStore } from "../store";
import type { MockProfile } from "../seed";

const SESSION_KEY = "mock-auth-session";

export const authQueries = {
  signUp: async (
    email: string,
    password: string,
    metadata?: { name?: string },
  ) => {
    await delay();
    const store = getMockStore();
    const existing = store.profiles.find(
      (p) => p.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) {
      return { data: null, error: { message: "User already registered" } };
    }

    const newProfile: MockProfile = {
      id: generateId("user"),
      email,
      password,
      name: metadata?.name || email.split("@")[0],
      avatar_url: null,
      role: "student",
      bio: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    mutateMockStore((s) => {
      s.profiles.push(newProfile);
    });

    return {
      data: { user: { id: newProfile.id, email: newProfile.email } },
      error: null,
    };
  },

  signIn: async (email: string, password: string) => {
    await delay();
    const store = getMockStore();
    const profile = store.profiles.find(
      (p) =>
        p.email.toLowerCase() === email.toLowerCase() &&
        p.password === password,
    );

    if (!profile) {
      return { data: null, error: { message: "Invalid login credentials" } };
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, profile.id);
    }

    return {
      data: {
        user: { id: profile.id, email: profile.email },
        session: { user: { id: profile.id, email: profile.email } },
      },
      error: null,
    };
  },

  signOut: async () => {
    await delay();
    if (typeof window !== "undefined") {
      localStorage.removeItem(SESSION_KEY);
    }
    return { error: null };
  },

  getCurrentUser: async () => {
    await delay();
    if (typeof window === "undefined") {
      return { data: null, error: null };
    }

    const sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) return { data: null, error: null };

    const store = getMockStore();
    const profile = store.profiles.find((p) => p.id === sessionId);
    if (!profile) return { data: null, error: null };

    return { data: { id: profile.id, email: profile.email }, error: null };
  },

  getUser: async () => {
    return authQueries.getCurrentUser();
  },

  getSession: async () => {
    await delay();
    const user = await authQueries.getCurrentUser();
    if (!user.data) return { data: { session: null }, error: null };
    return {
      data: {
        session: { user: user.data },
      },
      error: null,
    };
  },

  resetPassword: async (_email: string) => {
    await delay();
    return { error: null };
  },

  updatePassword: async (_newPassword: string) => {
    await delay();
    return { data: null, error: null };
  },

  // ⭐ Google OAuth simulado — logea al admin automático
  signInWithGoogle: async () => {
    await delay();
    const store = getMockStore();
    // Buscar al admin demo
    const adminProfile = store.profiles.find(
      (p) => p.email === "admin@demo.com",
    );

    if (!adminProfile) {
      return {
        data: null,
        error: { message: "Admin profile not found in mock data" },
      };
    }

    // Guardar sesión
    if (typeof window !== "undefined") {
      localStorage.setItem(SESSION_KEY, adminProfile.id);
    }

    return {
      data: {
        user: { id: adminProfile.id, email: adminProfile.email },
        session: { user: { id: adminProfile.id, email: adminProfile.email } },
      },
      error: null,
    };
  },
};
