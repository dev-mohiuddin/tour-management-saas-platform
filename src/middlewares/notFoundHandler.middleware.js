const notFoundHandler = (req, res, next) => {
  res.error({
    message: "Route Not Found",
    statusCode: 404,
    data: null,
  });
};

export default notFoundHandler;
