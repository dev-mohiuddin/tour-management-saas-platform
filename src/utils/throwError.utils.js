const throwError = (
  message = "Internal Server Error",
  statusCode = 500,
  data = null
) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  if (data) err.data = data; // optional extra info
  throw err;
};

export default throwError