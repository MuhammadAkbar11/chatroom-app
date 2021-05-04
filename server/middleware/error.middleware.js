const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode
    ? err.statusCode
    : res.statusCode === 200
    ? 500
    : res.statusCode;

  const isErrorsEmpty = obj => {
    if (obj === undefined) return true;
    return Object.keys(obj).length === 0;
  };

  const resErrorData = {
    status: false,
    statusCode: statusCode,
    message: err.message,
    errors: err.errors,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };

  if (!err.stack) {
    delete resErrorData.stack;
  }
  // console.log(err.errors);
  if (isErrorsEmpty(err.errors)) {
    delete resErrorData.errors;
  }

  return res.status(statusCode).json(resErrorData);
};

export { errorHandlerMiddleware };
