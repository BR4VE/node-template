import ObjectUtils from "helpers/utils/ObjectUtils";

class BaseModelService {
  constructor(model, publicFields = {}, returnFields = {}) {
    this.model = model;
    this.publicFields = publicFields;
    this.returnFields = returnFields;
  }

  create(fields) {
    // eslint-disable-next-line new-cap
    const instance = new this.model(fields);
    return instance.save();
  }

  findOneBy(fields) {
    return this.model.findOne(fields);
  }

  findOneById(id) {
    return this.model.findById(id);
  }

  findOneByIdAndUpdate(id, fields = {}) {
    return this.model.findOneAndUpdate(
      { _id: id },
      { $set: fields },
      { new: true }
    );
  }

  findManyBy(fields) {
    return this.model.find(fields);
  }

  // TODO: how we are going to hide user credentials when populating? Like passwords and other stuff
  findOneByIdWith(id, populateArr = []) {
    let query = this.findById(id);

    populateArr.forEach((field) => {
      query = query.populate(field);
    });

    return query;
  }

  getReturnFields(additionalFields = {}) {
    return {
      ...this.returnFields,
      ...ObjectUtils.filterObjectFields(additionalFields, this.publicFields),
    };
  }

  updateOneById(id, fields) {
    return this.model.updateOne({ _id: id }, { $set: fields });
  }

  updateOneBy(matchFields, updateFields) {
    return this.model.updateOne(matchFields, { $set: updateFields });
  }

  deleteOneById(id) {
    return this.model.deleteOne({ _id: id });
  }

  deleteManyBy(fields) {
    return this.model.deleteMany(fields);
  }
}

export default BaseModelService;
