import BadRequestError from "errors/BadRequestError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import UserModel from "models/UserModel";
import VerificationModel from "models/VerificationModel";
import VerificationService from "services/VerificationService";

export default class SendResetPasswordEmailController {
  static async respond(request) {
    const { email } = request.getData();
    const user = await UserModel.findOneByEmail(email);

    if (!user) {
      throw new BadRequestError(ErrorMessages.invalid("email"));
    }
    await VerificationModel.deleteUnverifiedVerifications(user, "password");
    await VerificationService.create(user, "password");

    request.respond();
  }
}
