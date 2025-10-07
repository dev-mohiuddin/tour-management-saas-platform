import { findUserByEmail } from "#repositories/platformUser.repository.js";
import { comparePassword } from "#utils/bcrypt.utils.js";
import throwError from "#utils/throwError.utils.js";
import jwt from "jsonwebtoken";

export const signIn = async (data) => {
  const existingUser = await findUserByEmail(data.email);
  if (!existingUser) throwError("Invalid email or password", 401);
  const isMatch = await comparePassword(data.password, existingUser.password);
  console.log(data.password, existingUser.password)
  console.log(isMatch)
  if (!isMatch) throwError("Invalid email or password", 401);

  const token = jwt.sign(
    {
      id: existingUser._id,
      role: existingUser.roleId,
      email: existingUser.email,
    },
    process.env.JWT_SECRET || "pqxntltc",
    { expiresIn: JWT_EXPIRES_IN || "7d" }
  );

  return {
    user: {
      id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      role: existingUser.roleId,
    },
    token,
  };
};
