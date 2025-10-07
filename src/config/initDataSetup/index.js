import { initPlatformRoles } from "./initRole.js";
import { initSuperAdmin } from "./initSuperAdmin.js";

export const initData = async () => {
  await initPlatformRoles();
  await initSuperAdmin();
};
