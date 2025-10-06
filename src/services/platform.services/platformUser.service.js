import {
  getAllUsers,
  findUserById,
  deleteUser,
  updateUser,
  findUserByEmail,
  createUser,
} from "#repositories/platformUser.repository.js";
import throwError from "#utils/throwError.utils.js";
import { hashPassword } from "#utils/bcrypt.utils.js";
import {
  findRoleById,
  findRoleByName,
} from "../../repositories/role.repository.js";

export const createPlatformUser = async (data, user) => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) throwError("Email already exists", 409);

  const role = await findRoleById(data.roleId);
  if (!role) throwError("Role not found", 404);

  const creatorHierarchy = user?.hierarchy || 0;
  const targetHierarchy = role.hierarchy || 0;

  if (targetHierarchy >= creatorHierarchy) {
    throwError(
      `You can only create users with lower access than you.`,
      403
    );
  }

  const hashedPassword = await hashPassword(data.password);

  const userData = {
    ...data,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    roleId: role._id,
  };
  return createUser(userData);
};

export const updatePlatformUserRole = async (userId, roleId) => {
  const role = await findRoleById(roleId);
  if (!role) throw new Error("Role not found");
  return updateUser(userId, { roleId: role._id });
};

export const getAllPlatformUsers = () => getAllUsers();
export const getPlatformUser = (id) => findUserById(id);
export const deletePlatformUser = (id) => deleteUser(id);
