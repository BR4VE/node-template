import bcryptjs from "bcryptjs";

class HashManager {
  constructor(api) {
    this.api = api;
  }

  hash(string) {
    const salt = this.api.genSaltSync(10);
    return this.api.hashSync(string, salt);
  }

  compare(string, hash) {
    return this.api.compareSync(string, hash);
  }
}

export default new HashManager(bcryptjs);
