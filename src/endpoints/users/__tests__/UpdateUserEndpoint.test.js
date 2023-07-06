import UpdateUserEndpoint from "endpoints/users/updateUser/UpdateUserEndpoint";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";
import UserModel from "models/UserModel";

describe("UpdateUserEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  test("Updates user", async () => {
    const [user] = TestDB.getTestData().users;
    const name = "John Doe";

    const response = await TestEndpointRequest(UpdateUserEndpoint, {
      user,
      name,
    });
    const updatedUser = await UserModel.findOneById(user._id);
    const { data, error, status } = response.body;

    expect(updatedUser.name).toBe(name);

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(status).toBe(200);
  });
});
