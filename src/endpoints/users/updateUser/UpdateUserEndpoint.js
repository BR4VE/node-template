import UpdateUserEndpointController from "endpoints/users/updateUser/UpdateUserEndpointController";
import UpdateUserEndpointCredentialChecks from "endpoints/users/updateUser/UpdateUserEndpointCredentialChecks";
import ErrorMessages from "helpers/utils/ErrorMessages";

export default {
  authentication: true,
  controller: UpdateUserEndpointController,
  credentialChecks: UpdateUserEndpointCredentialChecks,
  method: "post",
  path: "/users/updateUser",
  validation: {
    name: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("name"),
        options: { min: 1, max: 100 },
      },
    },
  },
};
