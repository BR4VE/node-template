import * as jwt from "jsonwebtoken";

import Environment from "infra/Environment";

const YEAR_AS_SECONDS = 365 * 24 * 60 * 60 * 1000;

class JWTService {
  constructor(api) {
    this.api = api;
  }

  signUserToken(user) {
    const payload = { userId: user._id, createdAt: new Date().toISOString() };
    const options = { expiresIn: YEAR_AS_SECONDS };

    return this.api.sign(payload, Environment.userTokenSecret, options);
  }
}

export default new JWTService(jwt);
