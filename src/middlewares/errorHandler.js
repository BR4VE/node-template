import CustomError from "errors/CustomError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import ExceptionHandler from "helpers/3rd/ExceptionHandler";
import Request from "helpers/Request";
import ServiceUnavailableError from "errors/ServiceUnavailableError";

export default async (error, req, res, next) => {
  const request = new Request(req, res);
  let err = error;

  if (!(err instanceof CustomError)) {
    const data = request.getData();
    const { ip, path, user = {} } = request.getRequest();

    user.ip = ip;
    user.email = user.email ?? data.email;

    ExceptionHandler.captureException(err, path, "endpoint", user, data);

    err = new ServiceUnavailableError(ErrorMessages.serviceUnavailable());
  }

  const { status } = err;
  request.status(status).respondJSON(null, {
    code: err.code,
    message: err.message || "",
  });
};
