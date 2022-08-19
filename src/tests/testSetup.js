import Environment from "infra/Environment";
import TestDB from "tests/TestDB";
// Import services so event listeners can be initialized
// eslint-disable-next-line no-unused-vars
import Services from "services";

beforeAll(async () => {
  await TestDB.initialize();
  const dbUri = await TestDB.getDBUri();
  Environment.set("dbUri", dbUri);
});

afterAll(async () => {
  await TestDB.closeDatabase();
  Environment.resetEnvVariables();
});
