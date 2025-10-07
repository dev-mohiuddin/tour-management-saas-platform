import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    tourPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
      index: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    }, 
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: { type: String, trim: true, maxlength: 1000 },
    isApproved: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

reviewSchema.index({ tourPackageId: 1, customerId: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
