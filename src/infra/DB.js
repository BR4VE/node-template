import mongoose from "mongoose";

import Environment from "infra/Environment";

class DB {
  constructor(dbUri, dbAPi) {
    this.dbUri = dbUri;
    this.dbApi = dbAPi;
  }

  connect() {
    this.dbApi.connect(this.dbUri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { connection } = this.dbApi;
    // TODO: change these console logs with logger
    connection.on("error", () => console.log("Cannot connect to DB."));
    connection.on("open", () => console.log("Connected to DB."));
  }
}

export default new DB(Environment.dbUri, mongoose);
