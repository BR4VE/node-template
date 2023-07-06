import mongoose from "mongoose";

import ObjectUtils from "helpers/utils/ObjectUtils";

class BaseModel {
  constructor({ schema, publicFields = {}, returnFields = {} }) {
    if (!schema?.name || !schema?.target) {
      throw new Error("Invalid Schema");
    }

    // Add indexes
    const { indexes = [], name, target } = schema;
    indexes.forEach(({ fields, options }) => {
      target.index(fields, options);
    });

    this.model = mongoose.model(name, target);
    this.defaultQueryFilters = {
      ...(!!target.paths.deleted && { deleted: false }),
    };
    this.publicFields = publicFields;
    this.returnFields = returnFields;
  }

  countBy(matchFields) {
    const query = {
      ...this.defaultQueryFilters,
      ...matchFields,
    };

    return this.model.countDocuments(query);
  }

  create(fields, options = { timestamps: true }) {
    // eslint-disable-next-line new-cap
    const instance = new this.model(fields);
    return instance.save(options);
  }

  findMostRecentOneBy(matchFields, additionalFields = {}) {
    const query = {
      ...this.defaultQueryFilters,
      ...matchFields,
    };

    return this.model
      .findOne(query)
      .select(this.getReturnFields(additionalFields))
      .sort({ createdAt: -1 });
  }

  findOneBy(matchFields, additionalFields = {}) {
    const query = {
      ...this.defaultQueryFilters,
      ...matchFields,
    };

    return this.model
      .findOne(query)
      .select(this.getReturnFields(additionalFields));
  }

  findOneById(id, additionalFields = {}) {
    const query = {
      ...this.defaultQueryFilters,
      _id: id,
    };

    return this.model
      .findOne(query)
      .select(this.getReturnFields(additionalFields));
  }

  findOneByIdAndUpdate(id, fields = {}, additionalFields = {}) {
    const query = {
      ...this.defaultQueryFilters,
      _id: id,
    };
    return this.model
      .findOneAndUpdate(query, { $set: fields }, { new: true })
      .select(this.getReturnFields(additionalFields));
  }

  findManyBy(matchFields, additionalFields = {}) {
    const query = {
      ...this.defaultQueryFilters,
      ...matchFields,
    };

    return this.model
      .find(query)
      .select(this.getReturnFields(additionalFields));
  }

  getReturnFields(additionalFields = {}) {
    return {
      ...this.returnFields,
      ...ObjectUtils.filterObjectFields(additionalFields, this.publicFields),
    };
  }

  increaseKeyById(id, key, amount = 1) {
    const query = {
      ...this.defaultQueryFilters,
      _id: id,
    };

    return this.model.findOneAndUpdate(
      query,
      { $inc: { [key]: amount } },
      { new: true }
    );
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
