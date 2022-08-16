import EventEmitter, { EventTypes } from "helpers/EventEmitter";
import TestDB from "tests/TestDB";
import UserModel from "models/UserModel";
import UserService from "services/UserService";

describe("UserService", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("Creates user with hashed password and urlName", async () => {
    const userData = { name: "mert", password: "mert123" };
    const mockFn = jest.spyOn(EventEmitter, "emit");

    const user = await UserService.createUser(userData);

    expect(user.name).toBe(userData.name);
    expect(user.password).toBeDefined();
    expect(user.password).not.toBe(userData.password);
    expect(user.urlName).toBe(userData.name);

    expect(mockFn).toHaveBeenCalledWith(EventTypes.userCreated, { user });
  });

  test("Finds available urlNames for same user names", async () => {
    const userData = { name: "mert", password: "mert123" };

    const user = await UserService.createUser(userData);

    expect(user.urlName).toBe("mert-1");
  });

  test("Compares passwords", async () => {
    const user = await UserModel.findOneBy({ urlName: "mert" });

    const results = await Promise.all([
      UserService.comparePasswords(user._id, "mert123"),
      UserService.comparePasswords(user._id, "123mert"),
    ]);

    expect(results).toEqual([true, false]);
  });

  test("Updates password", async () => {
    const user = await UserModel.findOneBy({ urlName: "mert" });
    const newPassword = "new_password_123";

    await UserService.updatePassword(user._id, newPassword);
    const results = await Promise.all([
      UserService.comparePasswords(user._id, "mert123"),
      UserService.comparePasswords(user._id, newPassword),
    ]);

    expect(results).toEqual([false, true]);
  });
});
