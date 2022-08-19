import SignupEndpoint from "endpoints/auth/signup/SignupEndpoint";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";

describe("SignupEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  test("Fails if user already exists", async () => {
    const [user] = TestDB.getTestData().users;
    const response = await TestEndpointRequest(SignupEndpoint, {
      email: user.email,
      name: "john",
      password: "123456789",
    });
    const { status, error } = response.body;

    expect(status).toBe(409);
    expect(error.type).toBe("already_exists");
    expect(error.prop).toBe("user");
  });

  test("Signs up user, returns authToken and user", async () => {
    const userData = {
      email: "new@test.com",
      name: "john",
      password: "123123123",
    };

    const response = await TestEndpointRequest(SignupEndpoint, userData);
    const { data, error, status } = response.body;
    const { authenticationToken, user } = data;

    expect(typeof authenticationToken === "string").toBe(true);

    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);

    expect(error).toBe(null);
    expect(status).toBe(200);
  });
});
