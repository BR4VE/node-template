import BadRequestError from "errors/BadRequestError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import passport from "passport";

export default function authenticateUser(req, res, next) {
  passport.authenticate(
    "user-rule",
    { session: false },
    async (err, user, info) => {
      if (err) {
        next(err);
        return;
      }

      if (!user && info) {
        next(new BadRequestError(ErrorMessages.invalid("Auth Token")));
        return;
      }

      req.user = user;
      next();
    }
  )(req, res, next);
}
