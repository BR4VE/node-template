import ErrorMessages from "helpers/utils/ErrorMessages";
import SendResetPasswordEmailController from "endpoints/auth/sendResetPasswordEmail/SendResetPasswordEmailController";
import SendResetPasswordEmailCredentialChecks from "endpoints/auth/sendResetPasswordEmail/SendResetPasswordEmailCredentialChecks";

export default {
  controller: SendResetPasswordEmailController,
  credentialChecks: SendResetPasswordEmailCredentialChecks,
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
