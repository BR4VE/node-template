import MailManager from "helpers/3rd/MailManager";
import SendResetPasswordEmailEndpoint from "endpoints/auth/sendResetPasswordEmail/SendResetPasswordEmailEndpoint";
import VerificationModel from "models/VerificationModel";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";

describe("SignupEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  test("Fails if user already exists", async () => {
    const response = await TestEndpointRequest(SendResetPasswordEmailEndpoint, {
      email: "test@test.com",
    });
    const { status, error } = response.body;

    expect(status).toBe(400);
    expect(error.type).toBe("invalid");
    expect(error.prop).toBe("email");
  });

  test("Creates verification", async () => {
    const [user] = TestDB.getTestData().users;
    const mockSend = jest.spyOn(MailManager, "sendVerificationEmail");

    const response = await TestEndpointRequest(SendResetPasswordEmailEndpoint, {
      email: user.email,
    });
    const verification = await VerificationModel.findOneBy({
      userId: user._id,
      type: "password",
    });
    const { data, error, status } = response.body;
    const [mailType, userMail] = mockSend.mock.lastCall;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(status).toBe(200);

    expect(verification._id).toBeDefined();

    expect(mailType).toBe("password");
    expect(userMail).toBe(user.email);

    mockSend.mockRestore();
  });

  test("Deletes old verifications", async () => {
    const [user] = TestDB.getTestData().users;
    const oldVerification = await VerificationModel.findActiveVerification(
      user,
      "password"
    );

    await TestEndpointRequest(SendResetPasswordEmailEndpoint, {
      email: user.email,
    });
    const updatedVerification = await VerificationModel.findOneBy(
      oldVerification._id
    );

    expect(updatedVerification).toBe(null);
  });
});
