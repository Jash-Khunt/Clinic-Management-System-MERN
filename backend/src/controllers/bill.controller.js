import Bill from "../models/bill.model.js";
import Visit from "../models/visit.model.js";
import Patient from "../models/patient.model.js";

export const createBill = async (req, res) => {
  try {
    const { visitId, amount, description } = req.body;

    if (!visitId || !amount) {
      return res.status(400).json({
        message: "Visit ID and amount are required fields",
      });
    }

    const visit = await Visit.findById(visitId);
    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }

    const existingBill = await Bill.findOne({ visit: visitId });
    if (existingBill) {
      return res.status(400).json({
        message: "A bill already exists for this visit.",
      });
    }

    const newBill = new Bill({
      patient: visit.patient,
      visit: visitId,
      amount,
      description:
        description ||
        `Medical consultation - ${new Date().toLocaleDateString()}`,
      createdBy: req.user._id,
      status: "unpaid",
    });

    const savedBill = await newBill.save();

    res.status(201).json({
      success: true,
      message: "Bill created successfully",
      data: savedBill,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("patient", "fullName phone")
      .populate({
        path: "visit",
        select: "symptoms diagnosis createdAt doctor",
        populate: { path: "doctor", select: "fullName" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate("patient", "fullName phone")
      .populate({
        path: "visit",
        select: "symptoms diagnosis createdAt doctor",
        populate: { path: "doctor", select: "fullName" },
      });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error("Error fetching bill:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBillStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["unpaid", "paid"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    bill.status = status;
    await bill.save();

    res.status(200).json({ message: "Bill status updated", bill });
  } catch (error) {
    console.error("Error updating bill status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ message: "Bill deleted", bill });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({ message: "Server error" });
  }
};
