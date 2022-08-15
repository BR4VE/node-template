import EventEmitter, { EventTypes } from "helpers/EventEmitter";
import HashManager from "helpers/HashManager";
import UserModel from "models/UserModel";
import SlugManager from "helpers/SlugManager";

class UserService {
  static async comparePasswords(userId, password) {
    const user = await UserModel.findOneById(userId, { password: true });
    if (!user) {
      return false;
    }

    return HashManager.compare(password, user.password);
  }

  static async createUser(data) {
    const urlName = await this.findAvailableUrlName(data.name);
    const hashedPassword = HashManager.hash(data.password);
    const userFields = { ...data, password: hashedPassword, urlName };

    const user = await UserModel.create(userFields);

    await EventEmitter.emit(EventTypes.userCreated, { user });

    return user;
  }

  static async findAvailableUrlName(userName) {
    const slugifiedUserName = SlugManager.slugify(userName);
    const user = await UserModel.findOneByUrlName(slugifiedUserName);

    if (!user) {
      return slugifiedUserName;
    }

    const urlNumber =
      Number(user.urlName.split(SlugManager.separator).reverse()[0]) || 0;

    return `${slugifiedUserName}${SlugManager.separator}${urlNumber + 1}`;
  }

  static updatePassword(userId, password) {
    const hashedPassword = HashManager.hash(password);
    return this.updateOneById(userId, { password: hashedPassword });
  }
}

export default UserService;
