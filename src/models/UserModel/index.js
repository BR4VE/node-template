import BaseModel from "models/BaseModel";
import UserSchema from "models/UserModel/UserSchema";

const AllPublicFields = {
  _id: true,
  email: true,
  imageUrl: true,
  name: true,
  password: true,
  urlName: true,
};
const ReturnFields = {
  _id: true,
  email: true,
  imageUrl: true,
  name: true,
  urlName: true,
};

class UserModel extends BaseModel {
  findOneByEmail(email, additionalFields = {}) {
    return super.findOneBy({ email }, additionalFields);
  }

  findManyBy(searchFields, sortKey, additionalFields = {}) {
    const query = super.findManyBy(searchFields, additionalFields);
    return sortKey ? query.sort({ [sortKey]: 1 }) : query;
  }

  findOneByUrlName(slugifiedUserName) {
    return this.findOneBy({
      urlName: { $regex: slugifiedUserName },
    })
      .select({ urlName: 1 })
      .sort({ urlName: -1 });
  }
}

export default new UserModel({
  schema: UserSchema,
  publicFields: AllPublicFields,
  returnFields: ReturnFields,
});
