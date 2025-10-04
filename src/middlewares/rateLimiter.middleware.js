import rateLimit from "express-rate-limit";
import { globalResponse } from "@/utlis/response.utll";

/**
 * Generate a rate limiter with custom handler
 * @param {number} maxRequests - Maximum requests per window
 * @param {number} windowMinutes - Window size in minutes
 * @returns Express middleware
 */
const createLimiter = (maxRequests = 100, windowMinutes = 15) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      const retryAfterSeconds = Math.ceil(
        (req.rateLimit.resetTime - Date.now()) / 1000
      );
      res.set("Retry-After", String(retryAfterSeconds));

      return globalResponse.error(
        res,
        429,
        "Too many requests. Please try again later.",
        null
      );
    },
  });
};

export const globalRateLimiter = (maxRequests = 100, windowMinutes = 15) => {
  return createLimiter(maxRequests, windowMinutes);
};

export const createRateLimiter = (maxRequests = 100, windowMinutes = 15) => {
  return createLimiter(maxRequests, windowMinutes);
};
