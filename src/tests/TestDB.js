import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

class TestDatabase {
  constructor() {
    this.memoryServer = null;
    this.api = mongoose;
    this.isInitialized = false;
    this.needsCleanup = true;
  }

  // called once before all tests
  async initialize() {
    if (this.isInitialized) {
      throw new Error(
        `Tried to initialize TestDB but it's already initialized`
      );
    }

    this.memoryServer = await MongoMemoryServer.create();
    const uri = await this.memoryServer.getUri();
    const apiOptions = {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await this.api.connect(uri, apiOptions);

    this.isInitialized = true;
  }

  async closeDatabase() {
    await this.api.connection.dropDatabase();
    await this.api.connection.close();
    await this.memoryServer.stop();
  }

  async clearDatabase() {
    const { collections } = this.api.connection;
    const promises = Object.values(collections).map((collection) =>
      collection.deleteMany()
    );

    await Promise.all(promises);
  }
}

export default new TestDatabase();
