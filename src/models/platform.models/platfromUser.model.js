import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const platformUserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 50 },
    lastName: { type: String, required: true, trim: true, maxlength: 50 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address."],
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: {
      type: String,
      enum: ["SuperAdmin", "CoAdmin", "SupportAdmin", "FinanceAdmin"],
      required: true,
    },
    profilePhoto: {
      url: { type: String },
      publicId: { type: String },
      uploadedAt: { type: Date, default: Date.now },
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false, select: false },
    deletedAt: { type: Date, default: null, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

platformUserSchema.index({ email: 1 }, { unique: true });

platformUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Soft delete filter
platformUserSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

platformUserSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const PlatformUser = mongoose.model("PlatformUser", platformUserSchema);

export default PlatformUser;
