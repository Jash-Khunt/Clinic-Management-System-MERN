import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useTokenStore = create((set) => ({
  tokens: [],

  fetchTodayTokens: async () => {
    try {
      const res = await axiosInstance.get("/token/today");
      set({ tokens: res.data });
    } catch (error) {
      toast.error("Failed to fetch tokens");
    }
  },

  createToken: async (data) => {
    try {
      const res = await axiosInstance.post("/token", data);
      toast.success("Token created!");
      set((state) => ({ tokens: [...state.tokens, res.data] }));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateTokenStatus: async (id, status) => {
    try {
      await axiosInstance.patch(`/token/${id}/status`, { status });
      toast.success("Token updated!");
      set((state) => ({
        tokens: state.tokens.map((t) => (t._id === id ? { ...t, status } : t)),
      }));
    } catch (error) {
      toast.error("Error updating token");
    }
  },
}));
