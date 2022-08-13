import Environment from "infra/Environment";
import LoggerService from "services/composite/LoggerService";

class Request {
  constructor(request, response) {
    this._request = request;
    this._response = response;
    this._status = 200;
  }

  getData() {
    const { body, params, query } = this.getRequest();
    return { ...body, ...params, ...query };
  }

  getPath() {
    return this.getRequest().path;
  }

  getRequest() {
    return this._request;
  }

  getUser() {
    return this.getRequest().user;
  }

  log(response) {
    if (Environment.isDev()) {
      return;
    }

    const { ip, path, user } = this.getRequest();
    // Logging to the console for cloud providers
    LoggerService.logRequest({
      event: "request_responded",
      ip,
      path,
      request: this.getData(),
      response,
      status: this._status,
      userId: user?._id,
    });
  }

  status(status) {
    this._status = status;
    return this;
  }

  respond() {
    this._response.status(this._status).end();
    this.log("success");
  }

  respondJSON(data, error = null) {
    this._response.status(this._status).json({
      error,
      data,
      status: this._status,
    });
    this.log(data);
  }
}

export default Request;
