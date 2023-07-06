import UserModel from "models/UserModel";

export default class UpdateUserEndpointController {
  static async respond(request) {
    const { name } = request.getData();
    const user = request.getUser();

    await UserModel.updateOneById(user._id, { name });

    request.respond();
  }
}
