import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useVisitStore = create((set) => ({
  visits: [],

  fetchAllVisits: async () => {
    try {
      const res = await axiosInstance.get("/visit");
      set({ visits: res.data });
    } catch (error) {
      toast.error("Failed to load visits");
    }
  },

  createVisit: async (data) => {
    try {
      const res = await axiosInstance.post("/visit", data);
      set((state) => ({ visits: [...state.visits, res.data] }));
      toast.success("Visit recorded");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  fetchVisitByPatient: async (patientId) => {
    try {
      const res = await axiosInstance.get(`/visit/patient/${patientId}`);
      set({ visits: res.data });
    } catch (error) {
      toast.error("Failed to load patient visits");
    }
  },
}));
