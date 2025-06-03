import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    visit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Visit",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
