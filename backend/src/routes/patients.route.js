import express from "express";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
  getPatientHistory,
} from "../controllers/patient.controller.js";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(protectRoute);

router.post("/", checkRole(["receptionist"]), createPatient);
router.get("/", getPatients);
router.get("/:id", getPatientById);
router.put("/:id", checkRole(["receptionist"]), updatePatient);
router.delete("/:id", checkRole(["receptionist"]), deletePatient);
router.get("/:id/history", getPatientHistory);

export default router;