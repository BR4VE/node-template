export default class Validator {
  static validatePhoneNumber(phoneNumber) {
    const PHONE_NUMBER_REGEX =
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return PHONE_NUMBER_REGEX.test(phoneNumber);
  }
}
