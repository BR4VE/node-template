import * as jwt from "jsonwebtoken";

import Environment from "infra/Environment";

const YEAR_AS_SECONDS = 365 * 24 * 60 * 60 * 1000;

class JWTManager {
  constructor(api) {
    this.api = api;
  }

  signUserToken(user) {
    const payload = { userId: user._id, createdAt: new Date().toISOString() };
    const options = { expiresIn: YEAR_AS_SECONDS };
    const userTokenSecret = Environment.get("userTokenSecret");

    return this.api.sign(payload, userTokenSecret, options);
  }
}

export default new JWTManager(jwt);
