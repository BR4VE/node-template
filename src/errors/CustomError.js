export default class CustomError extends Error {
  constructor(statusCode, message, customCode) {
    super();
    this.status = statusCode;
    this.message = message;
    this.code = customCode;
  }
}
