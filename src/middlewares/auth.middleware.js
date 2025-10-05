import jwt from "jsonwebtoken";
import { findUserById } from "#repositories/platformUser.repository.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer"))
      token = req.headers.authorization.split(" ")[1];
    if (!token) return res.error({ message: "Not logged in", statusCode: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    if (!user) return res.error({ message: "User not found", statusCode: 401 });

    req.user = {
      ...user.toObject(),
      permissions: user.role?.permissions || [],
    };
    next();
  } catch (err) {
    res.error({ message: err.message, statusCode: 401 });
  }
};

export const authorize = (requiredPermissions) => (req, res, next) => {
  try {
    const userPermissions = req.user?.permissions || [];

    if (userPermissions.includes("*")) return next();

    const perms = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions];
    const hasPermission = perms.some((p) => userPermissions.includes(p));
    if (!hasPermission)
      return res.error({ message: "Forbidden", statusCode: 403 });

    next();
  } catch (err) {
    res.error({ message: err.message, statusCode: 500 });
  }
};
