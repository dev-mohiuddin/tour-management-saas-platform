import PlatformUser from "#models/platform.models/platfromUser.model.js";

export const findUserById = async (id) => {
  return PlatformUser.findById(id).populate("roleId");
};

export const findUserByEmail = async (email) => {
  return PlatformUser.findOne({ email }).populate("roleId");
};

export const getAllUsers = async () => {
  return PlatformUser.find().populate("roleId");
};

export const createUser = async (data) => {
  return PlatformUser.create(data);
};

export const updateUser = async (id, data) => {
  return PlatformUser.findByIdAndUpdate(id, data, { new: true }).populate(
    "roleId"
  );
};

export const deleteUser = async (id) => {
  return PlatformUser.findByIdAndDelete(id);
};
