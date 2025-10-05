import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import xss from "xss";

const xssMiddleware = (req, res, next) => {
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "string") {
        obj[key] = xss(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };
  if (req.body) sanitize(req.body);
  next();
};

const securityMiddleware = [
  helmet(),
  cors(),
  hpp(),
  xssMiddleware, // custom sanitizer only
];

export default securityMiddleware;
