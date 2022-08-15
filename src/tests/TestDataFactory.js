import UserModelService from "services/model/UserModelService";

class TestDataFactory {
  static async createInstances({ users }) {
    const results = await Promise.all([this.createUsers(users)]);

    return results.reduce(
      (allInstances, modelInstances) => ({
        ...allInstances,
        ...modelInstances,
      }),
      {}
    );
  }

  static async createUsers(userCount) {
    if (!userCount) {
      return null;
    }

    const promises = new Array(userCount).fill(null).map(async (c, i) =>
      UserModelService.create({
        email: `test_email${i}@test.com`,
        name: `Test User ${i}`,
        password: `test_password_${i}`,
        phoneNumber: `+90 500 000 00 ${i}`,
      })
    );

    const users = await Promise.all(promises);

    return { users };
  }
}

export default TestDataFactory;
