import {
  getAllUsers,
  findUserById,
  deleteUser,
  updateUser,
  createUser,
} from "#repositories/platformUser.repository.js";
import { findRoleById, findRoleByName } from "../../repositories/role.repository.js";

export const createPlatformUser = async (data) => {
  const role = data.roleId
    ? await findRoleById(data.roleId)
    : await findRoleByName("SuperAdmin");
  return createUser({ ...data, role: role._id });
};

export const updatePlatformUserRole = async (userId, roleId) => {
  const role = await findRoleById(roleId);
  if (!role) throw new Error("Role not found");
  return updateUser(userId, { role: role._id });
};

export const getAllPlatformUsers = () => getAllUsers();
export const getPlatformUser = (id) => findUserById(id);
export const deletePlatformUser = (id) => deleteUser(id);
