import TestDB from "tests/TestDB";
import LoggerService from "services/LoggerService";
import LogModel from "models/LogModel";

describe("LoggerService", () => {
  beforeAll(async () => {
    await TestDB.setTestData({ users: 1 });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("Logs request", async () => {
    const user = TestDB.getTestData().users[0];
    const logData = {
      ip: "123123123",
      path: "/app",
      userId: user?._id,
    };
    const spy = jest.spyOn(LoggerService, "logToConsole");

    await LoggerService.logRequest(logData);
    const log = await LogModel.findOneBy({ userId: logData.userId });

    expect(log.ip).toEqual(logData.ip);
    expect(log.path).toBe(logData.path);
    expect(log.type).toBe("request");

    expect(spy).toHaveBeenCalled();
  });
});
