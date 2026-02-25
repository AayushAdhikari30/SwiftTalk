import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: null,
  isLoggingIn: null,
  isUpdatingProfile: null,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.log("Not authorized", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {},
}));
