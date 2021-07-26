import CustomError from "errors/CustomError";

const BadRequestStatusCode = 400;

export default class BadRequestError extends CustomError {
  constructor(message, customCode) {
    super(BadRequestStatusCode, message, customCode);
  }
}
