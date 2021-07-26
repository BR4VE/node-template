import PhoneConverterService from "services/3rd/PhoneConverterService";

export default {
  phoneNumber: {
    options: (phoneNumber) => PhoneConverterService.convertNumber(phoneNumber),
  },
};
