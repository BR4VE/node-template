import http from "http";

import WebServer from "server/WebServer";

import Environment from "infra/Environment";

const server = http.createServer(WebServer());

server.listen(Environment.apiPort, () => {
  // TODO: Change it with Logger Service
  console.log(`Listening ${Environment.apiPort} port.`);
});
