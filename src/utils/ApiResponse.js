class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.data = data;
    this.statusCode = statusCode < 400;
    this.message = message;
  }
}

export { ApiResponse };
