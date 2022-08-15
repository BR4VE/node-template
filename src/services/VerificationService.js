import DateUtils from "helpers/utils/DateUtils";
import EventEmitter, { EventTypes } from "helpers/EventEmitter";
import TokenService from "services/3rd/TokenService";
import VerificationModel from "models/VerificationModel";
import MailService from "services/3rd/MailService";

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

    await MailService.sendVerificationEmail(type, email, {
      userName: user.name,
      verificationUrl: "https://google.com",
      // TODO: change verification url later
    });

    return verification;
  }

  // Event listeners
  onUserCreated = ({ user }) => this.create(user, "email");
}

// Event Listeners
EventEmitter.on(EventTypes.userCreated, VerificationService.onUserCreated);

export default VerificationService;
