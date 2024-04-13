import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUserSlice, UserSlice, UserWithoutPassword } from "./userSlice";

// this is to slice the store into smaller stores
export const useAuthStore = create<UserSlice>()(
  persist(
    (...a) => ({
      ...createUserSlice(...a),
    }),
    {
      name: "bond-store",
      partialize: (state) => ({
        user: {
          id: state.user?.id,
          email: state.user?.email,
          displayName: state.user?.displayName,
          role: state.user?.role,
          createdAt: state.user?.createdAt,
          updatedAt: state.user?.updatedAt,
        } as UserWithoutPassword,
      }),
    }
  )
);
