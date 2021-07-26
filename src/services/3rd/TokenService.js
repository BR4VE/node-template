import randToken from "rand-token";

const DefaultTokenSize = 6;
const Numbers = "0123456789";

class TokenService {
  constructor(api) {
    this.api = api;
  }

  generateRandomNumber(size = DefaultTokenSize) {
    return this.api.generate(size, Numbers);
  }
}

export default new TokenService(randToken);
