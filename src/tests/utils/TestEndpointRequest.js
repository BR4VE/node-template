import request from "supertest";

import JWTManager from "helpers/3rd/JWTManager";
import WebServer from "server/WebServer";

export default async (endpoint, data = {}, q = "", path = "") => {
  const fullUrl = path ? `${path}${q}` : `/api${endpoint.path}${q}`;
  const query = request(WebServer())?.[endpoint.method](fullUrl);

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
