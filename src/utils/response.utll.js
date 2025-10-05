import { v4 as uuidv4 } from "uuid";

export const attachRequestId = (req, res, next) => {
  if (!req.requestId) req.requestId = uuidv4();
  next();
};

export const globalResponse = (req, res, next) => {
  res.success = ({
    data = null,
    message = "Success",
    statusCode = 200,
    pagination = null,
  } = {}) => {
    const response = {
      success: true,
      statusCode,
      message,
      data,
      ...(pagination ? { pagination } : {}),
      request: {
        method: req.method,
        url: req.originalUrl,
        ...(process.env.NODE_ENV !== "production" ? { ip: req.ip } : {}),
        requestId: req.requestId || null,
      },
    };
    res.status(statusCode).json(response);
  };

  res.error = ({
    message = "Something went wrong",
    statusCode = 400,
    data = null,
    trace = null,
  } = {}) => {
    if (!trace && req.lastError instanceof Error) {
      trace = req.lastError;
    }

    let errorTrace = null;

    if (trace instanceof Error) {
      errorTrace = {
        name: trace.name,
        message: trace.message,
        ...(process.env.NODE_ENV !== "production"
          ? { stack: trace.stack }
          : {}),
      };
    } else if (trace && typeof trace === "object") {
      errorTrace = trace;
    } else if (typeof trace === "string") {
      errorTrace = { message: trace };
    }

    const response = {
      success: false,
      statusCode,
      message,
      data,
      ...(errorTrace ? { trace: errorTrace } : {}),
      request: {
        method: req.method,
        url: req.originalUrl,
        ...(process.env.NODE_ENV !== "production" ? { ip: req.ip } : {}),
        requestId: req.requestId || null,
      },
    };

    res.status(statusCode).json(response);
  };

  next();
};
