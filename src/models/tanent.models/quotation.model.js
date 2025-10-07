import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    quotationRef: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    title: { type: String, required: [true, "Quotation title is required."] },
    details: {
      type: String,
      required: [true, "Quotation details are required."],
    },
    price: { type: Number, required: true },
    validUntil: { type: Date, required: true },
    status: {
      type: String,
      enum: ["draft", "sent", "accepted", "rejected", "expired"],
      default: "draft",
      index: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    convertedToBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
  },
  { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);
export default Quotation;
