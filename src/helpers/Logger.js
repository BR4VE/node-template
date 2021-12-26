import LogModelService from "services/model/LogModelService";
import ObjectUtils from "./utils/ObjectUtils";

/* eslint-disable no-console */
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
      ObjectUtils.hideObjectFields(request, HiddenFields)
    );
    const stringifiedResponse = JSON.stringify(
      ObjectUtils.hideObjectFields(response, HiddenFields)
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
