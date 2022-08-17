import PhoneManager from "helpers/3rd/PhoneManager";

export default {
  phoneNumber: {
    options: (phoneNumber) => PhoneManager.convertNumber(phoneNumber),
  },
};
