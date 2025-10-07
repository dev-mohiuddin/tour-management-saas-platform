import mongoose from "mongoose";

const agencySettingSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "main_settings" },
    branding: {
      logoUrl: { type: String },
      primaryColor: { type: String, default: "#3B82F6" },
      secondaryColor: { type: String, default: "#6B7280" },
    },
    invoiceSettings: {
      prefix: { type: String, default: "INV-" },
      footerNote: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const AgencySetting = mongoose.model("AgencySetting", agencySettingSchema);
export default AgencySetting;
