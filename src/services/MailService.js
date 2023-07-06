import UserMailModel from "models/UserMailModel";

class MailService {
  static async sendMail({ data = {}, toEmail, type, userId }) {
    // TODO: Call Mail Manager
    await UserMailModel.create({
      data,
      email: toEmail,
      type,
      userId,
    });
  }
}

export default MailService;
