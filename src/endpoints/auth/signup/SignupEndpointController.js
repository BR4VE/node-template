import ConflictError from "errors/ConflictError";
import ErrorMessages from "helpers/utils/ErrorMessages";

import UserModelService from "services/model/UserModelService";
import LoginEndpointController from "endpoints/auth/login/LoginEndpointController";

export default class SignupEndpointController {
  static async respond(request) {
    const { email, name, password, phoneNumber } = request.getData();
    const existingUser = await UserModelService.findByEmail(email);

    if (existingUser) {
      throw new ConflictError(ErrorMessages.alreadyExists("User"));
    }

    await UserModelService.create({
      email,
      name,
      password,
      phoneNumber,
    });

    await LoginEndpointController.respond(request);
  }
}
