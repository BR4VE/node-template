import mongoose from "mongoose";

import ObjectUtils from "helpers/utils/ObjectUtils";

class BaseModel {
  constructor({ schema, publicFields = {}, returnFields = {} }) {
    if (!schema?.name || !schema?.target) {
      throw new Error("Invalid Schema");
    }

    this.model = mongoose.model(schema.name, schema.target);
    this.publicFields = publicFields;
    this.returnFields = returnFields;
  }

  create(fields) {
    // eslint-disable-next-line new-cap
    const instance = new this.model(fields);
    return instance.save();
  }

  findOneBy(matchFields, additionalFields = {}) {
    return this.model
      .findOne(matchFields)
      .select(this.getReturnFields(additionalFields));
  }

  findOneById(id, additionalFields = {}) {
    return this.model
      .findById(id)
      .select(this.getReturnFields(additionalFields));
  }

  findOneByIdAndUpdate(id, fields = {}, additionalFields = {}) {
    return this.model
      .findOneAndUpdate({ _id: id }, { $set: fields }, { new: true })
      .select(this.getReturnFields(additionalFields));
  }

  findManyBy(matchFields, additionalFields = {}) {
    return this.model
      .find(matchFields)
      .select(this.getReturnFields(additionalFields));
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

export default BaseModel;
