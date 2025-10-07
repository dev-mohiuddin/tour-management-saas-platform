import express from "express";
import { signIn } from "#controllers/platform/p-auth.controller.js";

const router = express.Router();

router.post("/auth/p-login", signIn);

export default router;
