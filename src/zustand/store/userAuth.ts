import { AuthState, User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      expiration: null,
      user: null,
      setTokens: ({ token, refreshToken, expiration }) =>
        set({ token, refreshToken, expiration }),
      setToken: (token) => set({ token }),
      setUser: (user: User) => set({ user }),
      clearAuth: () =>
        set({ token: null, refreshToken: null, expiration: null, user: null }),
    }),
    {
      name: "auth-token",
    }
  )
);
