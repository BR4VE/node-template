import GetAllUsersEndpoint from "endpoints/users/getAllUsers/GetAllUsersEndpoint";
import TestDB from "tests/TestDB";
import TestEndpointRequest from "tests/utils/TestEndpointRequest";

describe("GetAllUsersEndpoint", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 2 });
  });

  test("Gets all users", async () => {
    const { users } = TestDB.getTestData();

    const response = await TestEndpointRequest(GetAllUsersEndpoint, {
      user: users[0],
    });
    const { data, error, status } = response.body;
    const { users: fetchedUsers } = data;
    const sortedUsers = fetchedUsers.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    expect(data.users).toHaveLength(2);
    expect(sortedUsers[0]._id).toEqual(users[0]._id.toString());
    expect(sortedUsers[1]._id).toEqual(users[1]._id.toString());

    expect(error).toBe(null);
    expect(status).toBe(200);
  });
});
