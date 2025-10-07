import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      index: true,
    },
    amount: { type: Number, required: true },
    method: {
      type: String,
      required: true,
      enum: ["bKash", "Nagad", "Card", "Cash", "Bank Transfer"],
    },
    gatewayTransactionId: { type: String, sparse: true, unique: true }, 
    status: {
      type: String,
      enum: ["successful", "failed", "pending", "refunded"],
      required: true,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
