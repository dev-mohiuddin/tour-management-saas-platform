import mongoose from "mongoose";
import validator from "validator";

const tenantUserSchema = new mongoose.Schema(
  {
    platformUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "A platform-level user ID is required."],
    },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Agency ID is required for context."],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email."],
      index: true,
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => !v || validator.isMobilePhone(v, "bn-BD"),
        message: "Invalid Bangladeshi phone number.",
      },
    },
    profilePhoto: {
      url: { type: String },
      publicId: { type: String },
      uploadedAt: { type: Date, default: Date.now },
    },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
    deactivatedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tenantUserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName || ""}`.trim();
});

tenantUserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "roleId",
    select: "name permissions",
  });
  next();
});

const TenantUser = mongoose.model("TenantUser", tenantUserSchema);

export default TenantUser;
