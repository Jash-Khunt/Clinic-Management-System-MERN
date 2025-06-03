import express from "express";
import { protectRoute, checkRole } from "../middlewares/auth.middleware.js";
import {
  createToken,
  getTodayTokens,
  updateTokenStatus,
} from "../controllers/token.controller.js";
const router = express.Router();
router.use(protectRoute);

router.post("/", checkRole(["receptionist"]), createToken);
router.get("/today", getTodayTokens);
router.patch("/:id/status", checkRole(["doctor"]), updateTokenStatus);
export default router;
