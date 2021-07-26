import CustomError from "errors/CustomError";

const ForbiddenStatusCode = 403;

export default class ForbiddenError extends CustomError {
  constructor(message, customCode) {
    super(ForbiddenStatusCode, message, customCode);
  }
}
