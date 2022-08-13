import http from "http";

import Environment from "infra/Environment";
import LoggerService from "services/composite/LoggerService";
import WebServer from "server/WebServer";

const server = http.createServer(WebServer());

server.listen(Environment.apiPort, () => {
  LoggerService.logToConsole(`Listening ${Environment.apiPort} port.`);
});
