import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Expense title is required."],
      trim: true,
    },
    description: { type: String, trim: true },
    amount: {
      type: Number,
      required: [true, "Expense amount is required."],
      min: 0,
    },
    category: {
      type: String,
      required: [true, "Expense category is required."],
      enum: [
        "Transport",
        "Accommodation",
        "Food",
        "Guide Fee",
        "Marketing",
        "Office Rent",
        "Utilities",
        "Other",
      ],
      index: true,
    },
    expenseDate: {
      type: Date,
      required: [true, "Expense date is required."],
      default: Date.now,
    },
    receipt: {
      url: { type: String },
      publicId: { type: String },
    },
    tourPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      default: null,
      index: true,
    }, 
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      default: null,
      index: true,
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
