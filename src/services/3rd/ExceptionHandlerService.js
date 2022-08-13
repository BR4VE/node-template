import * as Sentry from "@sentry/node";

import Environment from "infra/Environment";

class ExceptionHandlerService {
  constructor(api) {
    this.api = api;

    this.api.init({
      dsn: Environment.exceptionHandlerUrl,
      tracesSampleRate: 1.0,
    });
  }

  captureException(
    exception,
    path,
    pathType,
    // eslint-disable-next-line camelcase
    { _id: id, email, ip: ip_address, name: username } = {}
  ) {
    // Throw exceptions in the dev mode
    if (!Environment.isProduction()) {
      throw exception;
    }

    this.api.captureException(exception, {
      tags: {
        pathType,
        path,
      },
      user: {
        id,
        ip_address,
        email,
        username,
      },
    });
  }
}

export default new ExceptionHandlerService(Sentry);
