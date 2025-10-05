import dotenv from "dotenv";
import express from "express";
import { server, app } from "./src/socket/server.js";
import { globalResponse, attachRequestId } from "#utils/response.utll.js";
import globalErrorHandler from "#middlewares/globalErrorHandler.middleware.js";
import securityMiddleware from "#middlewares/security.middleware.js";
import notFoundHandler from "#middlewares/notFoundHandler.middleware.js";
import healthRouter from "#routes/v1/helth.route/helth.route.js";
import routerV1 from "#routes/v1/index.js";
import { connectDatabase } from "#config/dbConncet.js";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(attachRequestId);
app.use(securityMiddleware);

// global response formatter
app.use(globalResponse);

// routes
app.use("/api", routerV1);
app.get("/", (req, res) => {
  res.send("Server is running...");
});

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
