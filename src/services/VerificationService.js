import DateUtils from "helpers/utils/DateUtils";
import EventEmitter, { EventTypes } from "helpers/EventEmitter";
import TokenService from "helpers/3rd/TokenManager";
import VerificationModel from "models/VerificationModel";
import MailManager from "helpers/3rd/MailManager";

class VerificationService {
  static async create(user, type = "email") {
    const { email, _id: userId } = user;

    const code = TokenService.generateRandomNumber();
    const expireAt = DateUtils.getNextWeek();
    const verification = await VerificationModel.create({
      code,
      expireAt,
      type,
      userId,
    });

    await MailManager.sendVerificationEmail(type, email, {
      userName: user.name,
      verificationUrl: "https://google.com",
      // TODO: change verification url later
    });

    return verification;
  }

  // Event listeners
  static onUserCreated = ({ user }) => this.create(user, "email");
}

// Event Listeners
EventEmitter.on(EventTypes.userCreated, VerificationService.onUserCreated);

export default VerificationService;
