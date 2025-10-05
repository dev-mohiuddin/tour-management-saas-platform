import express from "express";
import platFromUserRouter from "./platform.route/platformUser.route.js";

const router = express.Router();

router.use("/v1", [platFromUserRouter]);

export default router;
