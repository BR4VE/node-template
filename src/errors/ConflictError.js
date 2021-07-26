import CustomError from "errors/CustomError";

const ConflictStatusCode = 409;

export default class ConflictError extends CustomError {
  constructor(message, customCode) {
    super(ConflictStatusCode, message, customCode);
  }
}
