// globalErrorHandler.js
import { ZodError } from "zod";

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let data = null;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    data = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));
  }

  const trace = err;

  return res.error({
    message,
    statusCode,
    data,
    trace,
  });
};
export default globalErrorHandler;
