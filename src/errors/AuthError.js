import CustomError from "errors/CustomError";

const UnauthorizedStatusCode = 401;

export default class AuthError extends CustomError {
  constructor(message, customCode) {
    super(UnauthorizedStatusCode, message, customCode);
  }
}
