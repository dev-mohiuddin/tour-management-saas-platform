import { signIn as signInService } from "#services/platform.services/p-auth.service.js";
import catchAsync from "#utils/catchAsync.js";

export const signIn = catchAsync(async (req, res) => {
  const { user, token } = await signInService(req.body);

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.success({
    data: user,
    message: `Login successful. Welcome, ${user.firstName} ${user.lastName}!`,
    statusCode: 200,
  });
});
