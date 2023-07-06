import GetMeEndpoint from "endpoints/users/getMe/GetMeEndpoint";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";

describe("GetMeEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  test("Gets authenticated user", async () => {
    const { users } = TestDB.getTestData();
    const authenticatedUser = users[0];

    const response = await TestEndpointRequest(GetMeEndpoint, {
      user: authenticatedUser,
    });
    const { data, error, status } = response.body;
    const { user } = data;

    expect(user._id).toEqual(authenticatedUser._id.toString());

    expect(error).toBe(null);
    expect(status).toBe(200);
  });
});
