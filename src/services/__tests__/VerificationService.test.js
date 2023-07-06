import TestDB from "tests/TestDB";
import VerificationModel from "models/VerificationModel";
import VerificationService from "services/VerificationService";

describe("VerificationService", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Creates verification", async () => {
    const user = TestDB.getTestData().users[0];
    const verificationType = "password";

    const verification = await VerificationService.create(
      user,
      verificationType
    );

    expect(verification.code).toBeDefined();
    expect(new Date(verification.expireAt).getTime()).toBeGreaterThan(
      Date.now()
    );
    expect(verification.type).toBe(verificationType);
    expect(verification.userId).toEqual(user._id);
  });

  test("Creates verification on user created", async () => {
    const [user] = TestDB.getTestData().users;

    const verification = await VerificationModel.findOneBy({
      userId: user._id,
      type: "email",
    });

    expect(verification.code).toBeDefined();
    expect(new Date(verification.expireAt).getTime()).toBeGreaterThan(
      Date.now()
    );
  });
});
