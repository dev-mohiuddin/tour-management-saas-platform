import PlatformUser from "#models/platform.models/platformUser.model.js";
import PlatformRole from "#models/platform.models/platformRole.model.js";
import { hashPassword } from "#utils/bcrypt.utils.js";

export const initSuperAdmin = async () => {
  try {
    const superAdminEmail =
      process.env.SUPER_ADMIN_EMAIL || "admin@platform.com";
    const superAdminPassword =
      process.env.SUPER_ADMIN_PASSWORD || "Admin@12345";

    const existing = await PlatformUser.findOne({
      email: "admin@platform.com",
    });
    if (existing) {
      console.log("SuperAdmin already exists.");
      return;
    }

    const superAdminRole = await PlatformRole.findOne({ name: "SuperAdmin" });
    if (!superAdminRole) {
      console.error(
        "CRITICAL: SuperAdmin role not found in database. Cannot create SuperAdmin user."
      );
      process.exit(1);
    }

    const hashedPass = await hashPassword(superAdminPassword);

    await PlatformUser.create({
      firstName: "System",
      lastName: "Admin",
      email: superAdminEmail,
      password: hashedPass,
      roleId: superAdminRole._id,
      isVerified: true,
      isActive: true,
    });

    console.log("Default SuperAdmin created: admin@platform.com / Admin@12345");
  } catch (err) {
    console.error("Error creating SuperAdmin:", err.message);
  }
};
