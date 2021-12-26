import ErrorMessages from "helpers/utils/ErrorMessages";
import SendResetPasswordEmailEndpointController from "endpoints/auth/sendResetPasswordEmail/SendResetPasswordEmailEndpointController";
import SendResetPasswordEmailEndpointCredentialChecks from "endpoints/auth/sendResetPasswordEmail/SendResetPasswordEmailEndpointCredentialChecks";

export default {
  controller: SendResetPasswordEmailEndpointController,
  credentialChecks: SendResetPasswordEmailEndpointCredentialChecks,
  method: "post",
  path: "/auth/send-reset-password-email",
  validation: {
    email: {
      in: ["body"],
      isEmail: {
        errorMessage: ErrorMessages.invalid("Email"),
      },
      normalizeEmail: true,
      trim: true,
    },
  },
};
