import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  createVisit,
  getAllVisits,
  getVisitById,
  getVisitsByPatient,
} from "../controllers/visit.controller.js";
const router = express.Router();
router.use(protectRoute);

router.post("/", checkRole(["doctor"]), createVisit);
router.get("/", getAllVisits);
router.get("/:id", getVisitById);
router.get("/patient/:patientId", getVisitsByPatient);

export default router;
