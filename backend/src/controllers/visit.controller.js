import Visit from "../models/visit.model.js";
import Token from "../models/token.model.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js";

export const createVisit = async (req, res) => {
  try {
    const { patientId, tokenId, symptoms, diagnosis, prescription } = req.body;
    const doctorId = req.user._id;

    if (!patientId || !tokenId) {
      return res
        .status(400)
        .json({ message: "Patient ID and Token ID are required" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    const visit = await Visit.create({
      patient: patientId,
      token: tokenId,
      doctor: doctorId,
      symptoms,
      diagnosis,
      prescription,
    });

    token.status = "completed";
    await token.save();

    res.status(201).json({ message: "Visit created and token updated", visit });
  } catch (error) {
    console.error("Error creating visit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllVisits = async (req, res) => {
  try {
    const { page = 1, limit = 20, date, doctorId } = req.query;
    const skip = (page - 1) * limit;
    const filter = {};
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: start, $lt: end };
    }

    if (doctorId) {
      filter.doctor = doctorId;
    }

    const [visits, total] = await Promise.all([
      Visit.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate("patient", "fullName")
        .populate("token", "tokenNumber")
        .populate("doctor", "fullName"),
      Visit.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: visits.length,
      total,
      pages: Math.ceil(total / limit),
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id)
      .populate("patient", "fullName phone")
      .populate("doctor", "name")
      .populate("token", "tokenNumber");

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    res.status(200).json(visit);
  } catch (error) {
    console.error("Error fetching visit by Id:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getVisitsByPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const visits = await Visit.find({ patient: req.params.patientId })
      .sort({ date: -1 })
      .populate("token", "tokenNumber date")
      .populate("doctor", "fullName specialization");

    res.status(200).json(visits);
  } catch (error) {
    console.error("Error fetching visit by Patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};
