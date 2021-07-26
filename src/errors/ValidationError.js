import CustomError from "errors/CustomError";

const ValidationErrorStatusCode = 422;

export default class ValidationError extends CustomError {
  constructor(message, customCode) {
    super(ValidationErrorStatusCode, message, customCode);
  }
}
