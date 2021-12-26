import LogModelService from "services/model/LogModelService";

/* eslint-disable no-console */
import hideObjectFields from "helpers/utils/hideObjectFields";

// TODO: update hidden fields
const HiddenFields = ["password"];

class Logger {
  static async logRequest({
    event,
    ip,
    path,
    request,
    response,
    status,
    userId,
  }) {
    const stringifiedRequest = JSON.stringify(
      hideObjectFields(request, HiddenFields)
    );
    const stringifiedResponse = JSON.stringify(
      hideObjectFields(response, HiddenFields)
    );
    console.log(
      `[${new Date().toISOString()}] ${event} ${userId} ${path} ${status} ${ip} ${stringifiedRequest} ${stringifiedResponse}`
    );

    await LogModelService.create({
      ip,
      path,
      userId,
      type: "request",
    });
  }
}

export default Logger;
