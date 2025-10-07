import mongoose from "mongoose";
import validator from "validator";

const inquirySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    source: {
      type: String,
      enum: ["Website", "Facebook", "WhatsApp", "Phone Call", "Walk-in"],
      default: "Website",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "unqualified", "converted"],
      default: "new",
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    notes: [
      {
        note: { type: String },
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        at: { type: Date, default: Date.now },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
