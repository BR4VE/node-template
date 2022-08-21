import ResetPasswordEndpoint from "endpoints/auth/resetPassword/ResetPasswordEndpoint";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";
import UserService from "services/UserService";
import VerificationModel from "models/VerificationModel";
import VerificationService from "services/VerificationService";

describe("ResetPasswordEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  test("Fails if user is not found", async () => {
    const response = await TestEndpointRequest(ResetPasswordEndpoint, {
      email: "test@fake.com",
      verificationCode: "123456",
      password: "12345678",
    });
    const { status, error } = response.body;

    expect(status).toBe(401);
    expect(error.type).toBe("invalid");
    expect(error.prop).toBe("email");
  });

  test("Fails if verification is not found", async () => {
    const [user] = TestDB.getTestData().users;

    const response = await TestEndpointRequest(ResetPasswordEndpoint, {
      email: user.email,
      password: "12345678",
      verificationCode: "123456",
    });
    const { error, status } = response.body;

    expect(error.type).toBe("not_exists");
    expect(error.prop).toBe("verification");

    expect(status).toBe(404);
  });

  test("Fails if verification code does not match", async () => {
    const [user] = TestDB.getTestData().users;

    await VerificationService.create(user, "password");
    const response = await TestEndpointRequest(ResetPasswordEndpoint, {
      email: user.email,
      password: "12345678",
      verificationCode: "123456",
    });
    const { error, status } = response.body;

    expect(error.type).toBe("invalid");
    expect(error.prop).toBe("verificationCode");

    expect(status).toBe(422);
  });

  test("Verifies verification and resets password", async () => {
    const [user] = TestDB.getTestData().users;
    const password = "12345678";
    const verification = await VerificationModel.findActiveVerification(
      user,
      "password"
    );

    const response = await TestEndpointRequest(ResetPasswordEndpoint, {
      email: user.email,
      password,
      verificationCode: verification.code,
    });
    const [updatedVerification, passwordMatches] = await Promise.all([
      VerificationModel.findOneById(verification._id),
      UserService.comparePasswords(user._id, password),
    ]);
    const { data, error, status } = response.body;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(status).toBe(200);

    expect(updatedVerification.verified).toBe(true);
    expect(passwordMatches).toBe(true);
  });
});
