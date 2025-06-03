import Patient from "../models/patient.model.js";
import Visit from "../models/visit.model.js";

export const createPatient = async (req, res) => {
  try {
    const { fullName, age, gender, address, phone, email, medicalHistory } =
      req.body;

    if (!fullName || !age || !gender || !phone) {
      return res
        .status(400)
        .json({ message: "Full name, age, gender, and phone are required." });
    }
    const existingPatient = await Patient.findOne({
      $or: [{ phone }, email ? { email } : null].filter(Boolean),
    });

    if (existingPatient) {
      return res
        .status(400)
        .json({ message: "Patient already exists with this phone or email" });
    }

    const newPatient = new Patient({
      fullName,
      age,
      gender,
      address,
      phone,
      email: email || undefined,
      medicalHistory: medicalHistory || [],
      createdBy: req.user._id,
    });

    const savedPatient = await newPatient.save();

    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error in createPatient:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: 1 });
    res.status(200).json(patients);
  } catch (error) {
    console.error("Error in getPatients:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    res.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.log("Error in getPatientById Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const { fullName, age, gender, address, phone, email, medicalHistory } =
      req.body;

    if (fullName) patient.fullName = fullName;
    if (age) patient.age = age;
    if (gender) patient.gender = gender;
    if (address) patient.address = address;
    if (phone) patient.phone = phone;
    if (email) patient.email = email;
    if (medicalHistory) patient.medicalHistory = medicalHistory;

    const updatedPatient = await patient.save();

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: updatedPatient,
    });
  } catch (error) {
    console.error("Error in updatePatient:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted", patient });
  } catch (error) {
    console.log("Error in deletePatient Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPatientHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const visits = await Visit.find({ patient: req.params.id })
      .sort({ createdAt: -1 })
      .populate("doctor", "fullName specialization")
      .populate("token", "tokenNumber date");

    res.status(200).json({
      success: true,
      fullName: patient.fullName,
      age: patient.age,
      gender: patient.gender,
      manuallyAddedHistory: patient.medicalHistory || [],
      visitHistory: visits,
    });
  } catch (error) {
    console.error("Error in getPatientHistory:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
