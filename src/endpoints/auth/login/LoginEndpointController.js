import AuthError from "errors/AuthError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import JWTService from "services/3rd/JWTService";
import UserModel from "models/UserModel";
import UserService from "services/UserService";

export default class LoginEndpointController {
  static async respond(request) {
    const { email, password } = request.getData();
    const user = await UserModel.findOneByEmail(email);

    if (!user) {
      throw new AuthError(ErrorMessages.invalid("Email or Password"));
    }

    const isPasswordCorrect = await UserService.comparePasswords(
      user._id,
      password
    );

    if (!isPasswordCorrect) {
      throw new AuthError(ErrorMessages.invalid("Email or Password"));
    }

    const authenticationToken = JWTService.signUserToken(user);

    request.respondJSON({
      authenticationToken,
      user,
    });
  }
}
