import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";

import AuthError from "errors/AuthError";
import Environment from "infra/Environment";
import ErrorMessages from "helpers/utils/ErrorMessages";
import UserModel from "models/UserModel";

const configPassport = (app) => {
  const userTokenSecret = Environment.get("userTokenSecret");
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: userTokenSecret,
  };

  const strategy = new Strategy(jwtOptions, async (payload, done) => {
    const user = await UserModel.findOneById(payload.userId);

    if (user) {
      done(null, user);
      return;
    }

    done(new AuthError(ErrorMessages.notExists("user")), false);
  });

  passport.use("user-rule", strategy);
  app.use(passport.initialize());
};

export default configPassport;
