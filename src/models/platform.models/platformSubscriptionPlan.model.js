import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required."],
      unique: true,
      trim: true,
    },
    description: { type: String, trim: true },
    price: {
      monthly: { type: Number, required: true, min: 0 },
      yearly: { type: Number, required: true, min: 0 },
    },
    features: {
      maxUsers: { type: Number, required: true },
      maxTours: { type: Number, required: true },
      enableMarketplace: { type: Boolean, default: false },
      enableApiAccess: { type: Boolean, default: false },
    },
    isActive: { type: Boolean, default: true, index: true },
    isPopular: { type: Boolean, default: false }, 
  },
  { timestamps: true }
);

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
export default SubscriptionPlan;