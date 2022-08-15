import TestDB from "tests/TestDB";

beforeAll(async () => {
  await TestDB.initialize();
});

afterAll(async () => {
  await TestDB.closeDatabase();
});
