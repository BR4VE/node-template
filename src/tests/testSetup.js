import TestDB from "tests/TestDB";
// Import services so event listeners can be initialized
// eslint-disable-next-line no-unused-vars
import Services from "services";

beforeAll(async () => {
  await TestDB.initialize();
});

afterAll(async () => {
  await TestDB.closeDatabase();
});
