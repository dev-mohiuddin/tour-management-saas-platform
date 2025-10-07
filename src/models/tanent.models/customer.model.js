import mongoose from "mongoose";
import validator from "validator";

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    tags: { type: [String], trim: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

customerSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName || ""}`.trim();
});

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
