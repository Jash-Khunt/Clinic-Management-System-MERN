import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptoms: String,
    diagnosis: String,
    prescription: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;
