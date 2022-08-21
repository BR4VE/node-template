export default class ErrorMessages {
  static alreadyExists(prop) {
    return { type: "already_exists", prop };
  }

  static invalid(prop) {
    return { type: "invalid", prop };
  }

  static notAuthorized(prop) {
    return { type: "unauthorized", prop };
  }

  static notExists(prop) {
    return { type: "not_exists", prop };
  }

  static required(prop) {
    return { type: "required", prop };
  }

  static serviceUnavailable() {
    return { type: "service_unavailable", prop: null };
  }
}
