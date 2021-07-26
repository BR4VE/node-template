import CustomError from "errors/CustomError";

const ServiceUnavailableStatusCode = 503;

export default class ServiceUnavailableError extends CustomError {
  constructor(message, customCode) {
    super(ServiceUnavailableStatusCode, message, customCode);
  }
}
