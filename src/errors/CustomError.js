export default class CustomError extends Error {
  constructor(statusCode, message, customCode) {
    super();
    this.status = statusCode;
    this.type = message.type;
    this.prop = message.prop;
    this.code = customCode;
  }
}
