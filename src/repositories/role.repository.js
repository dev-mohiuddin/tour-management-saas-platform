import Role from "#models/tanent.models/role.model.js";

export const findRoleByName = async (name) => {
  return Role.findOne({ name });
};

export const findRoleById = async (id) => {
  return Role.findById(id);
};

export const getAllRoles = async () => {
  return Role.find();
};

export const createRole = async (data) => {
  return Role.create(data);
};

export const updateRole = async (id, data) => {
  return Role.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRole = async (id) => {
  return Role.findByIdAndDelete(id);
};
