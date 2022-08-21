import request from "supertest";

import JWTManager from "helpers/3rd/JWTManager";
import WebServer from "server/WebServer";

export default async (endpoint, data = {}, path = "") => {
  const query = request(WebServer())?.[endpoint.method](
    `/api${endpoint.path}${path}`
  );

  const payload = { ...data };

  if (payload.user) {
    const authenticationToken = JWTManager.signUserToken(payload.user);
    query.set("Authorization", `Bearer ${authenticationToken}`);
    delete payload.user;
  }

  if (endpoint.method === "post") {
    query.send(payload);
  }

  return query;
};
