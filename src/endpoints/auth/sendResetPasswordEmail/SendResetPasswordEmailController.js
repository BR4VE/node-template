import BadRequestError from "errors/BadRequestError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import UserModelService from "services/model/UserModelService";
import VerificationModelService from "services/model/VerificationModelService";

export default class SendResetPasswordEmailController {
  static async respond(request) {
    const { email } = request.getData();
    const user = await UserModelService.findByEmail(email);

    if (!user) {
      throw new BadRequestError(ErrorMessages.invalid("Email"));
    }
    await VerificationModelService.deleteUnverifiedVerifications(
      user,
      "password"
    );
    await VerificationModelService.create(user, "password");

    request.respond();
  }
}
