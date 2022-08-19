import ErrorMessages from "helpers/utils/ErrorMessages";
import ResetPasswordEndpointController from "endpoints/auth/resetPassword/ResetPasswordEndpointController";
import ResetPasswordEndpointCredentialChecks from "endpoints/auth/resetPassword/ResetPasswordEndpointCredentialChecks";

export default {
  controller: ResetPasswordEndpointController,
  credentialChecks: ResetPasswordEndpointCredentialChecks,
  method: "post",
  path: "/auth/reset-password",
  validation: {
    email: {
      in: ["body"],
      isEmail: {
        errorMessage: ErrorMessages.invalid("email"),
      },
      normalizeEmail: true,
      trim: true,
    },
    password: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("password"),
        options: { min: 8, max: 50 },
      },
      trim: true,
    },
    verificationCode: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("verificationCode"),
        options: { min: 3, max: 50 },
      },
      trim: true,
    },
  },
};
