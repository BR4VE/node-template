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
}

export default new DB(Environment.dbUri, mongoose);
