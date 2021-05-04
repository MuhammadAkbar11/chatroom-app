function ErrorResponse(statusCode, message, errors = {}, stack = true) {
  this.statusCode = statusCode;
  this.message = message;
  this.errors = { ...errors };
  this.message = message || "Something went wrong";
  if (stack) {
    this.stack = new Error().stack;
  }
}

ErrorResponse.prototype = Object.create(Error.prototype);
ErrorResponse.prototype.constructor = ErrorResponse;

export default ErrorResponse;
