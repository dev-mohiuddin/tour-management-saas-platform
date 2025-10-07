import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    type: { type: String, enum: ["in_house", "freelance"], required: true },
    bio: { type: String, trim: true },
    skills: { type: [String], trim: true },
    languages: { type: [String], trim: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

const Guide = mongoose.model("Guide", guideSchema);
export default Guide;
