class ApiError extends Error {
  constructor(
    statusCode,                                    //handling the error of api's 
    message = "Something went wrong",              //it will give the status code and error
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}