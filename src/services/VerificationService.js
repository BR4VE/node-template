import DateUtils from "helpers/utils/DateUtils";
import EventEmitter, { EventTypes } from "helpers/EventEmitter";
import MailService from "services/MailService";
import TokenService from "helpers/3rd/TokenManager";
import VerificationModel from "models/VerificationModel";

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

    await MailService.sendMail({
      data: { verificationCode: code },
      toEmail: email,
      type: "verification",
      userId,
    });

    return verification;
  }

  // Event listeners
  static onUserCreated = ({ user }) => this.create(user, "email");
}

// Event Listeners
EventEmitter.on(EventTypes.userCreated, VerificationService.onUserCreated);

export default VerificationService;
