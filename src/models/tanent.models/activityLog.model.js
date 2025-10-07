import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: { type: String, required: true, index: true }, 
    target: {
      model: { type: String }, // e.g., 'Booking'
      id: { type: mongoose.Schema.Types.ObjectId },
    },
    details: { type: mongoose.Schema.Types.Mixed }, 
  },
  { timestamps: { createdAt: "timestamp", updatedAt: false } } 
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
export default ActivityLog;
