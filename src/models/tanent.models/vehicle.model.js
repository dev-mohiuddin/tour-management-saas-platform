import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vehicle name is required."],
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Bus", "Microbus", "Car", "Boat", "Other"],
    },
    capacity: { type: Number, required: true, min: 1 },
    licensePlate: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    driver: {
      name: { type: String, trim: true },
      phone: { type: String, trim: true },
    },
    status: {
      type: String,
      enum: ["available", "on_tour", "maintenance"],
      default: "available",
      index: true,
    },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
