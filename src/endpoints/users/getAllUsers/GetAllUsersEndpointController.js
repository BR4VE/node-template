import UserModel from "models/UserModel";

export default class GetAllUsersEndpointController {
  static async respond(request) {
    const { sort } = request.getData();
    const users = await UserModel.findManyBy({}, sort);
    request.respondJSON({ users });
  }
}
