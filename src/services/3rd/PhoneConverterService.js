import phone from "phone";

class PhoneConverterService {
  constructor(api) {
    this.api = api;
  }

  convertNumber(phoneNumber) {
    const { phoneNumber: convertedPhoneNumber } = this.api(phoneNumber);
    return convertedPhoneNumber;
  }
}

export default new PhoneConverterService(phone);
