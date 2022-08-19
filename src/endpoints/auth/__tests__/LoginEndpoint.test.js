import LoginEndpoint from "endpoints/auth/login/LoginEndpoint";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";
import UserModel from "models/UserModel";
import UserService from "services/UserService";

describe("LoginEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  test("Fails if user is not found", async () => {
    const response = await TestEndpointRequest(LoginEndpoint, {
      email: "test@fake.com",
      password: "123",
    });
    const { status, error } = response.body;

    expect(status).toBe(401);
    expect(error.type).toBe("invalid");
    expect(error.prop).toBe("email-or-password");
  });

  test("Fails if passwords don't match", async () => {
    const [user] = TestDB.getTestData().users;
    await UserService.updatePassword(user._id, "123");

    const response = await TestEndpointRequest(LoginEndpoint, {
      email: user.email,
      password: "1",
    });
    const { error, status } = response.body;

    expect(error.type).toBe("invalid");
    expect(error.prop).toBe("email-or-password");

    expect(status).toBe(401);
  });

  test("Returns authToken and user", async () => {
    const userId = TestDB.getTestData().users[0]._id;
    const user = await UserModel.findOneById(userId);

    const response = await TestEndpointRequest(LoginEndpoint, {
      email: user.email,
      password: "123",
    });
    const { data, error, status } = response.body;
    const { authenticationToken, user: returnedUser } = data;

    expect(typeof authenticationToken === "string").toBe(true);
    expect(user._id.equals(returnedUser._id)).toBe(true);

    expect(error).toBe(null);
    expect(status).toBe(200);
  });
});
