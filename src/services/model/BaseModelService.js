import filterObjectFields from "helpers/utils/filterObjectFields";

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

  findBy(fields) {
    return this.model.findOne(fields);
  }

  findById(id) {
    return this.model.findById(id);
  }

  findManyBy(fields) {
    return this.model.findManyBy(fields);
  }

  // TODO: how we are going to hide user credentials when populating? Like passwords and other stuff
  findByIdWith(id, populateArr = []) {
    let query = this.findById(id);

    populateArr.forEach((field) => {
      query = query.populate(field);
    });

    return query;
  }

  getReturnFields(additionalFields = {}) {
    return {
      ...this.returnFields,
      ...filterObjectFields(additionalFields, this.publicFields),
    };
  }

  updateById(id, fields) {
    return this.model.updateOne({ _id: id }, { $set: fields });
  }

  updateBy(matchFields, updateFields) {
    return this.model.updateOne(matchFields, { $set: updateFields });
  }

  deleteById(id) {
    return this.model.deleteOne({ _id: id });
  }

  deleteManyBy(fields) {
    return this.model.deleteMany(fields);
  }
}

export default BaseModelService;
