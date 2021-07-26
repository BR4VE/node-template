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
        errorMessage: ErrorMessages.invalid("Email"),
      },
      normalizeEmail: true,
      trim: true,
    },
    password: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("Password Length"),
        options: { min: 8, max: 50 },
      },
      trim: true,
    },
    verificationCode: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("Verification Code"),
        options: { min: 3, max: 50 },
      },
      trim: true,
    },
  },
};
