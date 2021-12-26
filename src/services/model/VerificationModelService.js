import BaseModelService from "services/model/BaseModelService";
import DateUtils from "helpers/utils/DateUtils";
import EventEmitter from "helpers/EventEmitter";
import TokenService from "services/3rd/TokenService";
import VerificationModel from "models/VerificationModel";
import MailService from "services/3rd/MailService";

class VerificationModelService extends BaseModelService {
  constructor(model) {
    super(model);

    EventEmitter.on(
      EventEmitter.eventTypes.userCreated,
      this.onUserCreated.bind(this)
    );
  }

  async create(user, type = "email") {
    const { email, _id: userId } = user;

    const code = TokenService.generateRandomNumber();
    const expireAt = DateUtils.getNextWeek();
    const verification = await super.create({
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

  deleteUnverifiedVerifications(user, type = "email") {
    return this.deleteManyBy({ type, userId: user._id, verified: false });
  }

  findActiveVerification(user, type = "email") {
    return this.findOneBy({
      expireAt: { $gte: new Date() },
      type,
      userId: user._id,
      verified: false,
    });
  }

  verify(verificationId) {
    return this.updateOneById(verificationId, {
      verified: true,
      verifiedAt: new Date(),
    });
  }

  // Event listeners
  onUserCreated({ user }) {
    return this.create(user, "email");
  }
}

export default new VerificationModelService(VerificationModel);
