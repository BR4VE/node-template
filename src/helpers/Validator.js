import mongoose from "mongoose";

export default class Validator {
  static validatePhoneNumber(phoneNumber) {
    const PHONE_NUMBER_REGEX =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return PHONE_NUMBER_REGEX.test(phoneNumber);
  }

  static validateId(id) {
    const idRegex = /^[a-fA-F0-9]{24}$/;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
    const hasValidLength = id?.toString()?.length === 24;
    const matchesRegex = idRegex.test(id);

    return isValidObjectId && hasValidLength && matchesRegex;
  }

  static validateUrl(url) {
    const urlPattern =
      /(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/;

    return urlPattern.test(url);
  }
}
