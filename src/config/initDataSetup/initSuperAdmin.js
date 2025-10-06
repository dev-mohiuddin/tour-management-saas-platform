import PlatformUser from "#models/platform.models/platfromUser.model.js";
import { hashPassword } from "#utils/bcrypt.utils.js";

export const initSuperAdmin = async () => {
  try {
    const existing = await PlatformUser.findOne({
      email: "admin@platform.com",
    });
    if (existing) {
      console.log("SuperAdmin already exists.");
      return;
    }

    const hashedPass = await hashPassword("Admin@12345");

    await PlatformUser.create({
      firstName: "System",
      lastName: "Admin",
      email: "admin@platform.com",
      password: hashedPass,
      role: "SuperAdmin",
      isVerified: true,
    });

    console.log(
      "Default SuperAdmin created: admin@platform.com / Admin@12345"
    );
  } catch (err) {
    console.error("Error creating SuperAdmin:", err.message);
  }
};
