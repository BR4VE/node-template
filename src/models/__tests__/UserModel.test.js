import TestDB from "tests/TestDB";
import UserModel from "models/UserModel";

describe("UserModel", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 2 });
  });

  test("Finds one by email", async () => {
    const [user] = TestDB.getTestData().users;

    const fetchedUser = await UserModel.findOneByEmail(user.email);

    expect(fetchedUser._id).toEqual(user._id);
  });

  test("Finds many by and sorts", async () => {
    const { users: dbUsers } = TestDB.getTestData();
    const users = await UserModel.findManyBy({}, "urlName");

    expect(users).toHaveLength(2);
    expect(users[0]._id).toEqual(dbUsers[0]._id);
    expect(users[1]._id).toEqual(dbUsers[1]._id);
  });

  test("Finds one by url name", async () => {
    const [user] = TestDB.getTestData().users;

    const fetchedUser = await UserModel.findOneByUrlName(user.urlName);

    expect(fetchedUser._id).toEqual(user._id);
  });
});
