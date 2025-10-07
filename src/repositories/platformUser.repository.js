import PlatformUser from "#models/platform.models/platformUser.model.js";

export const findUserById = async (id) => {
  return PlatformUser.findById(id)
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
};

export const findUserByEmail = async (email) => {
  return PlatformUser.findOne({ email })
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
};

export const getAllUsers = async () => {
  return PlatformUser.find()
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
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
