import { initRoles } from "./initRole.js";
import { initSuperAdmin } from "./initSuperAdmin.js";


export const initData = async () => {
  await initRoles();
  await initSuperAdmin();
}