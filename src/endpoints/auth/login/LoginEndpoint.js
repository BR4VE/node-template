import ErrorMessages from "helpers/utils/ErrorMessages";
import LoginEndpointController from "endpoints/auth/login/LoginEndpointController";
import LoginEndpointCredentialChecks from "endpoints/auth/login/LoginEndpointCredentialChecks";

export default {
  controller: LoginEndpointController,
  credentialChecks: LoginEndpointCredentialChecks,
  method: "post",
  path: "/auth/login",
  validation: {
    email: {
      in: ["body"],
      isEmail: {
        errorMessage: ErrorMessages.invalid("Email"),
      },
      normalizeEmail: true,
      trim: true,
    },
    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: ErrorMessages.required("Password"),
      },
      trim: true,
    },
  },
};
