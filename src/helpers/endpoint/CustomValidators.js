import BadRequestError from "errors/BadRequestError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import Validator from "helpers/Validator";

export default {
  id: {
    options: (id) => Validator.validateId(id),
    errorMessage: ErrorMessages.invalid("id"),
  },

  ids: {
    options: (ids) => {
      const allIds = Array.isArray(ids) ? ids : [ids];
      return allIds.every((id) => Validator.validateId(id));
    },
    errorMessage: ErrorMessages.invalid("ids"),
  },

  phoneNumber: {
    options: (phoneNumber) => {
      const isPhoneNumber = Validator.validatePhoneNumber(phoneNumber);
      if (!isPhoneNumber) {
        throw new BadRequestError(ErrorMessages.invalid("phoneNumber"));
      }
      return phoneNumber;
    },
  },
};
