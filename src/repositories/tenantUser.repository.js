import TenantUser from "#models/tanent.models/tanentUser.model.js";

export const findUserById = async (id) => {
  return TenantUser.findById(id).populate("roleId");
};

export const findUserByEmail = async (email) => {
  return TenantUser.findOne({ email }).populate("roleId");
};

export const getAllUsers = async () => {
  return TenantUser.find().populate("roleId");
};

export const createUser = async (data) => {
  return TenantUser.create(data);
};

export const updateUser = async (id, data) => {
  return TenantUser.findByIdAndUpdate(id, data, { new: true }).populate("roleId");
};

export const deleteUser = async (id) => {
  return TenantUser.findByIdAndDelete(id);
};
