import Role from "#models/tanent.models/role.model.js";
import { PLATFORM_ROLES, TENANT_DEFAULT_ROLES } from "#constants/roles.js";

export const initRoles = async () => {
  try {
    const allRoles = [...PLATFORM_ROLES, ...TENANT_DEFAULT_ROLES];

    for (const role of allRoles) {
      const existing = await Role.findOne({ name: role.name });
      if (!existing) {
        await Role.create(role);
        console.log(`Role created: ${role.name}`);
      } else {
        console.log(`Role already exists: ${role.name}`);
      }
    }
  } catch (err) {
    console.error(" Error initializing roles:", err.message);
  }
};
