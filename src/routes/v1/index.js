import express from "express";
import platformUserRouter from "./platform.route/platformUser.route.js";
import platformAuth from "./platform.route/platform.auth.route.js";

const router = express.Router();

router.use("/v1", [platformUserRouter, platformAuth]);

export default router;
