import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const usePatientStore = create((set) => ({
  patients: [],
  selectedPatient: null,

  fetchPatients: async () => {
    try {
      const res = await axiosInstance.get("/patient");
      set({ patients: res.data });
    } catch (error) {
      toast.error("Failed to fetch patients");
    }
  },

  addPatient: async (data) => {
    try {
      const res = await axiosInstance.post("/patient", data);
      set((state) => ({ patients: [...state.patients, res.data] }));
      toast.success("Patient added!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding patient");
    }
  },

  updatePatient: async (id, data) => {
    try {
      await axiosInstance.put(`/patient/${id}`, data);
      toast.success("Patient updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating patient");
    }
  },

  deletePatient: async (id) => {
    try {
      await axiosInstance.delete(`/patient/${id}`);
      set((state) => ({
        patients: state.patients.filter((p) => p._id !== id),
      }));
      toast.success("Patient deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting patient");
    }
  },

  fetchPatientHistory: async (id) => {
    try {
      const res = await axiosInstance.get(`/patient/${id}/history`);
      set({ selectedPatient: res.data });
      return res.data;
    } catch (error) {
      toast.error("Failed to load history");
    }
  },
}));
