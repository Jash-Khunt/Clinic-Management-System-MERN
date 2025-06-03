import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  createBill,
  getBills,
  getBillById,
  updateBillStatus,
  deleteBill,
} from "../controllers/bill.controller.js";
const router = express.Router();

router.use(protectRoute);
router.post("/", createBill);
router.get("/", getBills);
router.get("/:id", getBillById);
router.patch("/:id/status", updateBillStatus);
router.delete("/:id", deleteBill);

export default router;
