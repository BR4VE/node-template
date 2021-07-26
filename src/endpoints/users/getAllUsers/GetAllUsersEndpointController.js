import UserModelService from "services/model/UserModelService";

export default class GetAllUsersEndpointController {
  static async respond(request) {
    const { sort } = request.getData();
    const users = await UserModelService.findManyBy({}, sort);
    request.respondJSON({ users });
  }
}
