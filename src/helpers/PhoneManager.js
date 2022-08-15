import phone from "phone";

class PhoneManager {
  constructor(api) {
    this.api = api;
  }

  convertNumber(phoneNumber) {
    const { phoneNumber: convertedPhoneNumber } = this.api(phoneNumber);
    return convertedPhoneNumber;
  }
}

export default new PhoneManager(phone);
