import mongoose from "mongoose";

import Environment from "infra/Environment";
import ExceptionHandlerService from "services/3rd/ExceptionHandlerService";

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
      ExceptionHandlerService.captureException(error);
      console.log("Cannot connect to DB.");
    }

    const { connection } = this.dbApi;
    // TODO: change these console logs with logger
    connection.on("open", () => console.log("Connected to DB."));
  }
}

export default new DB(Environment.dbUri, mongoose);
