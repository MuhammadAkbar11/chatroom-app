function ErrorResponse(
  statusCode,
  name = "DefaultError ",
  message,
  errors = {},
  stack = true
) {
  this.name = name;
  this.statusCode = statusCode;
  this.message = message;
  this.errors = { ...errors };
  this.message = message || "Something went wrong";
  if (stack) {
    this.stack = new Error().stack;
  }

  if (this.name === "ValidationError") {
    this.message = "Validation Error";
    this.statusCode = 403;
    this.errors = {
      validation: errors,
    };
  }
}

ErrorResponse.prototype = Object.create(Error.prototype);
ErrorResponse.prototype.constructor = ErrorResponse;

export default ErrorResponse;
