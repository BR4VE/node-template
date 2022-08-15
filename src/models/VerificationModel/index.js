import BaseModel from "models/BaseModel";
import VerificationSchema from "models/VerificationModel/VerificationSchema";

class VerificationModel extends BaseModel {
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
}

export default new VerificationModel({ schema: VerificationSchema });
