import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tenant (Agency) name is required."],
      trim: true,
      unique: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlatformUser",
      required: [true, "Tenant must have an owner."],
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending_verification", "active", "suspended", "rejected"],
      default: "pending_verification",
      index: true,
    },
    dbInfo: {
      dbName: {
        type: String,
        required: [true, "Database name for the tenant is required."],
        unique: true,
      },
    },
    subscription: {
      planId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
      startDate: { type: Date },
      endDate: { type: Date },
      status: {
        type: String,
        enum: ["trial", "active", "past_due", "cancelled"],
      },
    },

    contact: {
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
      },
      phone: { type: String, required: true, trim: true },
      address: { type: String, trim: true },
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      default: null,
    },
    isDeleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date, default: null, select: false },
  },
  { timestamps: true }
);

// Soft delete filter
tenantSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

const Tenant = mongoose.model("Tenant", tenantSchema);
export default Tenant;
