
import dotenv from "dotenv";
import express from "express";
import { server, app } from "./src/socket/server.js";
import { globalResponse, attachRequestId } from "./src/utlis/response.utll.js";
import globalErrorHandler from "./src/middlewares/globalErrorHandler.middleware.js";
import securityMiddleware from "./src/middlewares/security.middleware.js";
import notFoundHandler from "./src/middlewares/notFoundHandler.middleware.js";
import healthRouter from "./src/routes/v1/helth.route/helth.route.js";
import { connectDatabase } from "./src/config/dbConncet.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(attachRequestId);
app.use(securityMiddleware);

// global response formatter
app.use(globalResponse);

// health route
app.use("/api/health", healthRouter);

// not found handler
app.use(notFoundHandler);

// global error handler
app.use(globalErrorHandler);

// server
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

const startServer = async () => {
  await connectDatabase();

  const response = server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    response.close(() => process.exit(1));
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    response.close(() => process.exit(0));
  });
};

startServer();
