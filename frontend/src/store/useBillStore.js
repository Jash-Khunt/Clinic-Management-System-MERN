import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-toastify";

export const useBillStore = create((set) => ({
  bills: [],
  currentBill: null,
  isLoading: false,
  error: null,

  fetchBills: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/bill");
      set({ bills: res.data, isLoading: false });
    } catch (error) {
      console.log("Error fetching bills: ", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      toast.error(error.response?.data?.message || "Failed to fetch bills");
    }
  },

  createBill: async (billData) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.post("/bill", billData);
      set((state) => ({
        bills: [res.data.data, ...state.bills],
        isLoading: false,
      }));
      toast.success("Bill created successfully!");
      return res.data.data;
    } catch (error) {
      console.log("Error creating bill: ", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      toast.error(error.response?.data?.message || "Failed to create bill");
      throw error;
    }
  },

  getBillById: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get(`/bill/${id}`);
      set({ currentBill: res.data, isLoading: false });
      return res.data;
    } catch (error) {
      console.log("Error fetching bill: ", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      toast.error(error.response?.data?.message || "Failed to fetch bill");
    }
  },

  updateBillStatus: async (id, status) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.patch(`/bill/${id}/status`, { status });
      set((state) => ({
        bills: state.bills.map((bill) =>
          bill._id === id ? { ...bill, status } : bill
        ),
        currentBill:
          state.currentBill?._id === id
            ? { ...state.currentBill, status }
            : state.currentBill,
        isLoading: false,
      }));
      toast.success("Bill status updated successfully!");
      return res.data;
    } catch (error) {
      console.log("Error updating bill status: ", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      toast.error(
        error.response?.data?.message || "Failed to update bill status"
      );
      throw error;
    }
  },

  deleteBill: async (id) => {
    try {
      set({ isLoading: true });
      await axiosInstance.delete(`/bill/${id}`);
      set((state) => ({
        bills: state.bills.filter((bill) => bill._id !== id),
        currentBill: state.currentBill?._id === id ? null : state.currentBill,
        isLoading: false,
      }));
      toast.success("Bill deleted successfully!");
    } catch (error) {
      console.log("Error deleting bill: ", error);
      set({
        error: error.response?.data?.message || error.message,
        isLoading: false,
      });
      toast.error(error.response?.data?.message || "Failed to delete bill");
    }
  },

  clearCurrentBill: () => set({ currentBill: null }),
}));
