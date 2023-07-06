import BaseModel from "models/BaseModel";
import UserMailSchema from "models/UserMailModel/UserMailSchema";

class UserMailModel extends BaseModel {
  findWithTypes({ userId, types = [] }) {
    return this.findManyBy({ userId, type: { $in: types } });
  }
}

export default new UserMailModel({
  schema: UserMailSchema,
});
