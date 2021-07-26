import CustomError from "errors/CustomError";
import Environment from "infra/Environment";
import ErrorMessages from "helpers/utils/ErrorMessages";
import ExceptionHandlerService from "services/3rd/ExceptionHandlerService";
import Request from "helpers/Request";
import ServiceUnavailableError from "errors/ServiceUnavailableError";

export default async (error, req, res, next) => {
  const request = new Request(req, res);
  let err = error;

  if (!(err instanceof CustomError)) {
    if (Environment.isDev()) {
      throw err;
    }

    const data = request.getData();
    const { ip, path, user = {} } = request.getRequest();

    user.ip = ip;
    user.email = user.email ?? data.email;

    ExceptionHandlerService.captureException(err, path, "endpoint", user, data);

    err = new ServiceUnavailableError(ErrorMessages.serviceUnavailable());
    // TODO: Check sentry here err.message? event emitters?
  }

  const { status } = err;
  request.status(status).respondJSON(null, {
    code: err.code,
    message: err.message || "",
  });
};
