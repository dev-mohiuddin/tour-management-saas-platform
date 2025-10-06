import jwt from "jsonwebtoken";
import { findUserById as findPlatformUserById } from "#repositories/platformUser.repository.js";
import { findUserByEmail as findTenantUserById } from "#repositories/tenantUser.repository.js";

export const protect =
  (userType = "tenant") =>
  async (req, res, next) => {
    try {
      let token;
      if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token)
        return res.error({ message: "Not logged in", statusCode: 401 });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;
      if (userType === "platform") {
        user = await findPlatformUserById(decoded.id, { populateRole: true });
      } else if (userType === "tenant") {
        user = await findTenantUserById(decoded.id, { populateRole: true });
      }

      if (!user)
        return res.error({ message: "User not found", statusCode: 401 });

      req.user = {
        ...user.toObject(),
        roleId: user.role?._id,
        permissions: user.role?.permissions || [],
        hierarchy: user.role?.hierarchy || 0,
        roleName: user.role?.name || null,
      };

      next();
    } catch (err) {
      res.error({ message: err.message, statusCode: 401, trace: err.stack });
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
    res.error({ message: err.message, statusCode: 500, trace: err.stack });
  }
};
