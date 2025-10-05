import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUserRole,
  deleteUser,
} from "#controllers/platform/platform.controller.js";
import { protect, authorize } from "#middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("*")); 

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.patch("/:userId/role", updateUserRole);
router.delete("/:userId", deleteUser);

export default router;
