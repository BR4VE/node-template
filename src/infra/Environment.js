/** @format */

import env from "env-var";
import { config } from "dotenv";

class Environment {
  constructor() {
    this._setEnvVariables();
  }

  isDev() {
    return this.NODE_ENV === "development";
  }

  _setEnvVariables() {
    this.NODE_ENV = process.env.NODE_ENV;

    if (this.isDev()) {
      config();
    }

    this.apiPort =
      process.argv[2] || env.get("PORT").default(5000).asPortNumber();
    this.dbUri = env.get("DB_URI").asString();
    this.exceptionHandlerUrl = env.get("EXCEPTION_HANDLER_URL").asUrlString();
    this.mailServiceAPIKey = env.get("MAIL_SERVICE_API_KEY").asString();
    this.userTokenSecret = env.get("USER_TOKEN_SECRET").asString();
  }
}

export default new Environment();
