import sgMail from "@sendgrid/mail";

import Environment from "infra/Environment";

const EmailFromName = "Mert Batmazoglu";
const EmailFrom = "mertbatmazoglu@gmail.com";
const EmailVerificationTemplateId = "d-288913c26dd743a7901f3d5c460e52aa";
const PasswordVerificationTemplateId = "none";

function getVerificationTemplateIdByType(type) {
  switch (type) {
    case "email":
      return EmailVerificationTemplateId;
    case "password":
      return PasswordVerificationTemplateId;
    default:
      return "";
  }
}

class MailManager {
  constructor(api) {
    this.api = api;
    this.api.setApiKey(Environment.mailServiceAPIKey);
  }

  async sendVerificationEmail(type, toEmail, { userName, verificationUrl }) {
    const templateData = { userName, verificationUrl };
    const templateId = getVerificationTemplateIdByType(type);
    return this.sendEmail(toEmail, templateId, templateData);
  }

  async sendEmail(toEmail, templateId, templateData) {
    const msg = {
      to: toEmail,
      from: {
        name: EmailFromName,
        email: EmailFrom,
      },
      templateId,
      dynamic_template_data: templateData,
    };

    return this.api.send(msg);
  }
}

export default new MailManager(sgMail);
