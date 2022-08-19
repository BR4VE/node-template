import http from "http";

import Environment from "infra/Environment";
import LoggerService from "services/LoggerService";
import WebServer from "server/WebServer";

const server = http.createServer(WebServer());
const apiPort = Environment.get("apiPort");

server.listen(apiPort, () => {
  LoggerService.logToConsole(`Listening ${apiPort} port.`);
});
