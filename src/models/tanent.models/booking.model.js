import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingRef: { type: String, required: true, unique: true, uppercase: true },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    tourPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
      index: true,
    },
    departureId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departure",
      index: true,
    }, // Not required for booking_based tours
    participants: [participantSchema],
    financials: {
      totalAmount: { type: Number, required: true },
      amountPaid: { type: Number, default: 0 },
      dueAmount: { type: Number, required: true },
      paymentStatus: {
        type: String,
        enum: ["unpaid", "partially_paid", "paid"],
        default: "unpaid",
        index: true,
      },
    },
    status: {
      type: String,
      enum: ["pending_payment", "confirmed", "cancelled", "completed"],
      default: "pending_payment",
      index: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

bookingSchema.pre(/^find/, function (next) {
  this.populate("customerId", "firstName lastName email").populate(
    "tourPackageId",
    "title"
  );
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
