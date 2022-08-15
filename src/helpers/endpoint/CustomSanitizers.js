import PhoneManager from "helpers/PhoneManager";

export default {
  phoneNumber: {
    options: (phoneNumber) => PhoneManager.convertNumber(phoneNumber),
  },
};
