import z from "zod";
import mongoose from "mongoose";

const mongoIdParamValidation = z.object({
  params: z.object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid user ID format",
    }),
  }),
});

export default mongoIdParamValidation;
