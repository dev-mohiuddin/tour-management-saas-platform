import {
  createPlatformUser,
  getAllPlatformUsers,
  getPlatformUser,
  updatePlatformUserRole,
  deletePlatformUser,
} from "#services/platform.services/platformUser.service.js";
import catchAsync from "#utils/catchAsync.js";

export const createUser = catchAsync(async (req, res) => {
  const user = await createPlatformUser(req.body, req.user);

  res.success({
    data: user,
    message: "User created successfully",
    statusCode: 201,
  });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await getAllPlatformUsers();
  res.success({ data: users, message: "Users retrieved" });
});

export const getUser = catchAsync(async (req, res) => {
  const user = await getPlatformUser(req.params.userId);
  res.success({ data: user, message: "User retrieved" });
});

export const updateUserRole = catchAsync(async (req, res) => {
  const updated = await updatePlatformUserRole(
    req.params.userId,
    req.body.roleId
  );
  res.success({ data: updated, message: "User role updated" });
});

export const deleteUser = catchAsync(async (req, res) => {
  await deletePlatformUser(req.params.userId);
  res.success({ message: "User deleted" });
});
