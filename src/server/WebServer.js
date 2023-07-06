import DB from "infra/DB";
import Endpoints from "endpoints/Endpoints";
import Scheduler from "scheduler/Scheduler";

import configPassport from "helpers/endpoint/configPassport";
import cors from "cors";
import errorHandler from "middlewares/errorHandler";
import express from "express";
import helmet from "helmet";
import httpsRedirect from "middlewares/httpsRedirect";

class Server {
  constructor() {
    this.app = express();
    this.db = DB;
    this.router = express.Router();

    this.initApp();
  }

  initApp() {
    this.configApp();
    this.configDb();
    this.configPassport();
    this.setRouter();
    this.setEndpoints();
    this.setErrorHandler();
    this.setScheduler();
  }

  configApp() {
    this.app
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(helmet())
      .use(httpsRedirect());
  }

  configDb() {
    this.db.connect();
  }

  configPassport() {
    configPassport(this.app);
  }

  setRouter() {
    this.app.use("/api", this.router);
  }

  setEndpoints() {
    new Endpoints(this.router).setEndpoints();
  }

  setErrorHandler() {
    this.app.use(errorHandler);
  }

  setScheduler() {
    this.scheduler = new Scheduler([]);
    this.scheduler.run();
  }
}

export default () => new Server().app;
