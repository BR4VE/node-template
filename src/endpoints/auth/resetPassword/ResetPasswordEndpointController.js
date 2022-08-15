import AuthError from "errors/AuthError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import NotFoundError from "errors/NotFoundError";
import UserModel from "models/UserModel";
import UserService from "services/UserService";
import ValidationError from "errors/ValidationError";
import VerificationModel from "models/VerificationModel";

export default class ResetPasswordEndpointController {
  static async respond(request) {
    const { email, password, verificationCode } = request.getData();
    const user = await UserModel.findOneByEmail(email);

    if (!user) {
      throw new AuthError(ErrorMessages.invalid("Email"));
    }

    const verification = await VerificationModel.findActiveVerification(
      user,
      "password"
    );

    if (!verification) {
      throw new NotFoundError(ErrorMessages.notExists("Verification"));
    }

    if (verification.code !== verificationCode) {
      throw new ValidationError(ErrorMessages.invalid("Verification Code"));
    }

    await Promise.all([
      VerificationModel.verify(verification._id),
      UserService.updatePassword(user._id, password),
    ]);

    request.respond();
  }
}
