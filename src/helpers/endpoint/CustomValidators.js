import BadRequestError from "errors/BadRequestError";
import ErrorMessages from "helpers/utils/ErrorMessages";
import Validator from "helpers/Validator";

export default {
  phoneNumber: {
    options: (phoneNumber) => {
      const isPhoneNumber = Validator.validatePhoneNumber(phoneNumber);
      if (!isPhoneNumber) {
        throw new BadRequestError(ErrorMessages.invalid("PhoneNumber"));
      }
      return phoneNumber;
    },
  },
};
