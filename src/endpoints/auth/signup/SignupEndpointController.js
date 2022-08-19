import ConflictError from "errors/ConflictError";
import ErrorMessages from "helpers/utils/ErrorMessages";

import LoginEndpointController from "endpoints/auth/login/LoginEndpointController";
import UserModel from "models/UserModel";
import UserService from "services/UserService";

export default class SignupEndpointController {
  static async respond(request) {
    const { email, name, password, phoneNumber } = request.getData();
    const existingUser = await UserModel.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictError(ErrorMessages.alreadyExists("user"));
    }

    await UserService.createUser({
      email,
      name,
      password,
      phoneNumber,
    });

    await LoginEndpointController.respond(request);
  }
}
