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

  isTest() {
    return this.NODE_ENV === "test";
  }

  isProduction() {
    return this.NODE_ENV === "production";
  }

  get(variableName) {
    return this._activeVariables[variableName];
  }

  set(variableName, value) {
    this._activeVariables[variableName] = value;
  }

  resetEnvVariables() {
    this._activeVariables = this._initialVariables;
  }

  _setEnvVariables() {
    this.NODE_ENV = process.env.NODE_ENV;

    if (this.isDev() || this.isTest()) {
      config();
    }

    const variables = {
      apiPort: process.argv[2] || env.get("PORT").default(5000).asPortNumber(),
      dbUri: env.get("DB_URI").asString(),
      exceptionHandlerUrl: env.get("EXCEPTION_HANDLER_URL").asUrlString(),
      mailServiceAPIKey: env.get("MAIL_SERVICE_API_KEY").asString(),
      userTokenSecret: env.get("USER_TOKEN_SECRET").asString(),
    };

    this._initialVariables = variables;
    this._activeVariables = variables;
  }
}

export default new Environment();
