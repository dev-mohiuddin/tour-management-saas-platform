import TenantUser from "#models/tanent.models/tanentUser.model.js";

export const findUserById = async (id) => {
  return TenantUser.findById(id)
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
};

export const findUserByEmail = async (email) => {
  return TenantUser.findOne({ email })
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
};

export const getAllUsers = async () => {
  return TenantUser.find()
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
};

export const createUser = async (data) => {
  return TenantUser.create(data);
};

export const updateUser = async (id, data) => {
  return TenantUser.findByIdAndUpdate(id, data, { new: true })
    .populate({
      path: "roleId",
      select: "_id name permissions hierarchy",
      strictPopulate: false,
    })
    .exec();
};

export const deleteUser = async (id) => {
  return TenantUser.findByIdAndDelete(id);
};
