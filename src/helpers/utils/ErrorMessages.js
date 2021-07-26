export default class ErrorMessages {
  static alreadyExists(prop) {
    return `${prop} already exists`;
  }

  static invalid(prop) {
    return `${prop} is invalid`;
  }

  static notAuthorized(action) {
    return `User is not authorized to ${action}`;
  }

  static notExists(prop) {
    return `${prop} doesn't exist`;
  }

  static required(prop) {
    return `${prop} is required`;
  }

  static serviceUnavailable() {
    return `Service unavailable`;
  }
}
