import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
} from "#controllers/platform/p-user.controller.js";
import { protect, authorize } from "#middlewares/auth.middleware.js";

const router = express.Router();

// router.use(protect);
// router.use(authorize("*"));

router.post("/p-user", createUser);
router.get("/p-user", getAllUsers);
router.get("/p-user/:userId", getUser);
router.patch("/p-user/:userId/role", updateUserRole);
router.delete("/p-user/:userId", deleteUser);

export default router;
