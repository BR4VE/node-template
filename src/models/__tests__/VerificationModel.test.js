import TestDB from "tests/TestDB";
import VerificationModel from "models/VerificationModel";
import DateUtils from "helpers/utils/DateUtils";

const TestVerificationData = {
  code: 12345,
  expireAt: DateUtils.getNextWeek(),
  type: "password",
};

describe("VerificationModel", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });

    const [user] = TestDB.getTestData().users;
    await VerificationModel.create({
      ...TestVerificationData,
      userId: user._id,
    });
  });

  test("Finds active verification", async () => {
    const [user] = TestDB.getTestData().users;
    const verificationType = "email";

    const verification = await VerificationModel.findActiveVerification(
      user,
      verificationType
    );

    expect(verification.type).toBe(verificationType);
    expect(verification.userId).toEqual(user._id);
    expect(verification.verified).toBe(false);
  });

  test("Verifies verification", async () => {
    const [user] = TestDB.getTestData().users;
    const verification = await VerificationModel.findOneBy({
      userId: user._id,
      type: "email",
    });

    await VerificationModel.verify(verification._id);
    const updatedVerification = await VerificationModel.findOneById(
      verification._id
    );

    expect(updatedVerification.verified).toBe(true);
    expect(new Date(updatedVerification.verifiedAt).getTime()).toBeLessThan(
      Date.now()
    );
  });

  it("Deletes unverified verifications", async () => {
    const [user] = TestDB.getTestData().users;

    await Promise.all([
      VerificationModel.deleteUnverifiedVerifications(user, "email"),
      VerificationModel.deleteUnverifiedVerifications(user, "password"),
    ]);
    const [emailVerification, passwordVerification] = await Promise.all([
      VerificationModel.findOneBy({ userId: user._id, type: "email" }),
      VerificationModel.findOneBy({ userId: user._id, type: "password" }),
    ]);

    expect(emailVerification._id).toBeDefined();
    expect(passwordVerification).toBe(null);
  });
});
