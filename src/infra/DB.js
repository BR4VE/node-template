import mongoose from "mongoose";

import Environment from "infra/Environment";
import ExceptionHandler from "helpers/3rd/ExceptionHandler";
import LoggerService from "services/LoggerService";

class DB {
  constructor(dbUri, dbAPi) {
    this.dbUri = dbUri;
    this.dbApi = dbAPi;
  }

  async connect() {
    if (this.isConnected()) {
      return;
    }

    try {
      await this.dbApi.connect(this.dbUri, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      ExceptionHandler.captureException(error);
      LoggerService.logToConsole("Cannot connect to DB.");
    }

    LoggerService.logToConsole("Connected to DB.");
  }

  isConnected() {
    return this?.dbApi?.connection?.readyState === 1;
  }
}

export default new DB(Environment.get("dbUri"), mongoose);
