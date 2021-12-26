import AuthError from "errors/AuthError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import NotFoundError from "errors/NotFoundError";
import UserModelService from "services/model/UserModelService";
import ValidationError from "errors/ValidationError";
import VerificationModelService from "services/model/VerificationModelService";

export default class ResetPasswordEndpointController {
  static async respond(request) {
    const { email, password, verificationCode } = request.getData();
    const user = await UserModelService.findOneByEmail(email);

    if (!user) {
      throw new AuthError(ErrorMessages.invalid("Email"));
    }

    const verification = await VerificationModelService.findActiveVerification(
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
      VerificationModelService.verify(verification._id),
      UserModelService.updatePassword(user._id, password),
    ]);

    request.respond();
  }
}
