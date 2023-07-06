export default class GetMeEndpointController {
  static async respond(request) {
    const user = request.getUser();

    request.respondJSON({
      user: {
        ...user.toObject(),
      },
    });
  }
}
