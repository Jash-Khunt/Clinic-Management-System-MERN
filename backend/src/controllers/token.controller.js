import Token from "../models/token.model.js";
import Patient from "../models/patient.model.js";
import Visit from "../models/visit.model.js";
export const createToken = async (req, res) => {
  try {
    const { patientId } = req.body;
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const lastToken = await Token.findOne({
      date: { $gte: todayStart, $lte: todayEnd },
    }).sort({ tokenNumber: -1 });

    const nextTokenNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

    const newToken = await Token.create({
      tokenNumber: nextTokenNumber,
      patient: patientId,
      status: "pending",
      date: new Date(),
    });

    res.status(201).json(newToken);
  } catch (error) {
    console.error("Error creating token:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTodayTokens = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const tokens = await Token.find({
      $or: [
        { date: { $gte: todayStart, $lte: todayEnd } },
        { status: "pending" },
      ],
    })
      .populate("patient", "fullName age gender phone email")
      .sort({ tokenNumber: 1 });

    const tokensWithVisit = await Promise.all(
      tokens.map(async (token) => {
        const visit = await Visit.findOne({ token: token._id });
        return {
          ...token.toObject(),
          visit,
        };
      })
    );

    res.status(200).json(tokensWithVisit);
  } catch (error) {
    console.error("Error fetching today's tokens:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTokenStatus = async (req, res) => {
  try {
    const tokenId = req.params.id;
    const { status } = req.body;

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const token = await Token.findById(tokenId);
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }

    token.status = status;
    await token.save();

    res.status(200).json({ message: "Token status updated", token });
  } catch (error) {
    console.error("Error updating token status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
