import ErrorMessages from "helpers/utils/ErrorMessages";
import GetAllUsersEndpointController from "endpoints/users/getAllUsers/GetAllUsersEndpointController";
import GetAllUsersEndpointCredentialChecks from "endpoints/users/getAllUsers/GetAllUsersEndpointCredentialChecks";

export default {
  authentication: true,
  controller: GetAllUsersEndpointController,
  credentialChecks: GetAllUsersEndpointCredentialChecks,
  method: "get",
  path: "/users",
  validation: {
    sort: {
      in: ["query"],
      isIn: {
        options: [["name", "createdAt"]],
        errorMessage: ErrorMessages.invalid("Sort"),
      },
    },
  },
};
