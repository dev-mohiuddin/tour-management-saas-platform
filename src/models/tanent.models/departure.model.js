import mongoose from "mongoose";

const departureSchema = new mongoose.Schema(
  {
    tourPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
      index: true,
    },
    departureDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    totalSeats: { type: Number, required: true, min: 1 },
    bookedSeats: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["open", "full", "completed", "cancelled"],
      default: "open",
      index: true,
    },
    assignedGuides: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guide" }],
  },
  { timestamps: true }
);

const Departure = mongoose.model("Departure", departureSchema);
export default Departure;
