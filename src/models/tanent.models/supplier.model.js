import mongoose from "mongoose";
import validator from "validator";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplier name is required."],
      trim: true,
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Supplier type is required."],
      enum: ["Hotel", "Transport", "ActivityProvider", "Restaurant", "Other"],
      index: true,
    },
    contact: {
      person: { type: String, trim: true },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid contact email."],
        sparse: true, 
      },
      phone: { type: String, required: true, trim: true },
      address: { type: String, trim: true },
    },
    isActive: { type: Boolean, default: true },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
