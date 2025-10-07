import mongoose from "mongoose";

const pricingTierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Adult", "Child", "Student", "Infant"],
    },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const itineraryDaySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    activities: [
      {
        time: { type: String, trim: true },
        description: { type: String, required: true, trim: true },
        _id: false,
      },
    ],
  },
  { _id: false }
);

const tourPackageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: "text" },
    slug: { type: String, required: true, unique: true, trim: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },
    destination: { type: String, required: true, trim: true },
    duration: {
      days: { type: Number, required: true, min: 1 },
      nights: { type: Number, required: true, min: 0 },
    },
    overview: { type: String, required: true, trim: true },
    pricing: {
      currency: { type: String, default: "BDT" },
      basePrice: { type: Number, required: true, min: 0 },
      tiers: [pricingTierSchema],
    },
    itinerary: [itineraryDaySchema],
    inclusions: { type: [String], trim: true },
    exclusions: { type: [String], trim: true },
    gallery: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        caption: { type: String },
        _id: false,
      },
    ],
    inventoryType: {
      type: String,
      enum: ["seat_based", "booking_based"],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const TourPackage = mongoose.model("TourPackage", tourPackageSchema);
export default TourPackage;
