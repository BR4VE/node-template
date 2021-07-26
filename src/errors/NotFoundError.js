import CustomError from "errors/CustomError";

const NotFoundStatusCode = 404;

export default class NotFoundError extends CustomError {
  constructor(message, customCode) {
    super(NotFoundStatusCode, message, customCode);
  }
}
