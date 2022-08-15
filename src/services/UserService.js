import EventEmitter, { EventTypes } from "helpers/EventEmitter";
import HashService from "services/3rd/HashService";
import UserModel from "models/UserModel";
import SlugService from "services/3rd/SlugService";

class UserService {
  static async comparePasswords(userId, password) {
    const user = await UserModel.findOneById(userId, { password: true });
    if (!user) {
      return false;
    }

    return HashService.compare(password, user.password);
  }

  static async createUser(data) {
    const urlName = await this.findAvailableUrlName(data.name);
    const hashedPassword = HashService.hash(data.password);
    const userFields = { ...data, password: hashedPassword, urlName };

    const user = await UserModel.create(userFields);

    await EventEmitter.emit(EventTypes.userCreated, { user });

    return user;
  }

  static async findAvailableUrlName(userName) {
    const slugifiedUserName = SlugService.slugify(userName);
    const user = await UserModel.findOneByUrlName(slugifiedUserName);

    if (!user) {
      return slugifiedUserName;
    }

    const urlNumber =
      Number(user.urlName.split(SlugService.separator).reverse()[0]) || 0;

    return `${slugifiedUserName}${SlugService.separator}${urlNumber + 1}`;
  }

  static updatePassword(userId, password) {
    const hashedPassword = HashService.hash(password);
    return this.updateOneById(userId, { password: hashedPassword });
  }
}

export default UserService;
