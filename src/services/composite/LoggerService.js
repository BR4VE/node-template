import LogModelService from "services/model/LogModelService";
import ObjectUtils from "helpers/utils/ObjectUtils";

/* eslint-disable no-console */
const HiddenFields = ["password"];

class LoggerService {
  static logToConsole(message) {
    console.log(message);
  }

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
      ObjectUtils.hideObjectFields(request, HiddenFields)
    );
    const stringifiedResponse = JSON.stringify(
      ObjectUtils.hideObjectFields(response, HiddenFields)
    );

    this.logToConsole(
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

export default LoggerService;
