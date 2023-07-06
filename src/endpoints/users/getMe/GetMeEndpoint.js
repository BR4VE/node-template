import GetMeEndpointController from "endpoints/users/getMe/GetMeEndpointController";
import GetMeEndpointCredentialChecks from "endpoints/users/getMe/GetMeEndpointCredentialChecks";

export default {
  authentication: true,
  controller: GetMeEndpointController,
  credentialChecks: GetMeEndpointCredentialChecks,
  method: "get",
  path: "/users/me",
};
