import mongoose from "mongoose";

import BaseModel from "models/BaseModel";

const AllPublicFields = { firstName: true, lastName: true, code: true };
const ReturnFields = { firstName: true, lastName: true };
const EntitySchema = mongoose.Schema(
  {
    deleted: { type: Boolean, default: false },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    code: { type: Number, default: null },
  },
  { timestamps: true }
);
const EntityModel = new BaseModel({
  schema: { name: "Entity", target: EntitySchema },
  publicFields: AllPublicFields,
  returnFields: ReturnFields,
});
const DeletedEntity = { firstName: "John", lastName: "Doe", code: 456 };
const TestEntity = { firstName: "Mert", lastName: "Btmz", code: 123 };

describe("BaseModel", () => {
  beforeAll(async () => {
    const entity = await EntityModel.create(DeletedEntity);
    await EntityModel.model.updateOne({ _id: entity._id }, { deleted: true });

    DeletedEntity._id = entity._id;
  });

  test("Creates", async () => {
    const entity = await EntityModel.create(TestEntity);

    expect(entity.firstName).toBe(TestEntity.firstName);
    expect(entity.lastName).toBe(TestEntity.lastName);
    expect(entity.code).toBe(TestEntity.code);

    TestEntity._id = entity._id;
  });

  test("Finds most recent one by and returns fields", async () => {
    const data = { ...TestEntity };
    delete data._id;

    const entity = await EntityModel.create(data);
    const mostRecentOne = await EntityModel.findMostRecentOneBy({
      firstName: TestEntity.firstName,
    });
    const entityFields = Object.keys(mostRecentOne.toObject());

    expect(mostRecentOne._id).toEqual(entity._id);
    expect(entityFields).toEqual([...Object.keys(ReturnFields), "_id"]);

    // Cleanup
    await EntityModel.model.deleteOne({ _id: mostRecentOne._id });
  });

  test("Finds one by and returns fields", async () => {
    const entity = await EntityModel.findOneBy({
      firstName: TestEntity.firstName,
    });
    const entityFields = Object.keys(entity.toObject());

    expect(entityFields).toEqual([...Object.keys(ReturnFields), "_id"]);
  });

  test("Finds one by id and returns fields", async () => {
    const entity = await EntityModel.findOneById(TestEntity._id, {
      code: true,
    });
    const entityFields = Object.keys(entity.toObject());

    expect(entity._id).toEqual(TestEntity._id);
    expect(entityFields).toEqual([...Object.keys(AllPublicFields), "_id"]);
  });

  test("Finds one by id and updates", async () => {
    const updateData = { lastName: "B" };

    await EntityModel.findOneByIdAndUpdate(TestEntity._id, updateData);
    const entity = await EntityModel.findOneById(TestEntity._id);
    const entityFields = Object.keys(entity.toObject());

    expect(entity.lastName).toBe(updateData.lastName);

    expect(entityFields).toEqual([...Object.keys(ReturnFields), "_id"]);
  });

  test("Finds many by and returns fields", async () => {
    const entities = await EntityModel.findManyBy(
      { firstName: "Mert" },
      { code: true }
    );

    expect(entities.length).toBeGreaterThan(0);

    entities.forEach((entity) => {
      const entityFields = Object.keys(entity.toObject());
      expect(entityFields).toEqual([...Object.keys(AllPublicFields), "_id"]);
    });
  });

  test("Does not find deleted files", async () => {
    const results = await Promise.all([
      EntityModel.findOneBy({ firstName: DeletedEntity.firstName }),
      EntityModel.findOneById(DeletedEntity._id),
      EntityModel.findOneByIdAndUpdate(DeletedEntity._id, { deleted: false }),
    ]);
    const resultArr = await EntityModel.findManyBy({
      firstName: DeletedEntity.firstName,
    });

    expect(resultArr).toHaveLength(0);
    results.forEach((result) => expect(result).toBe(null));
  });

  test("Gets return fields", async () => {
    const returnFields = EntityModel.getReturnFields();
    const allPublicFields = EntityModel.getReturnFields({ code: true });

    expect(returnFields).toEqual(ReturnFields);
    expect(allPublicFields).toEqual(AllPublicFields);
  });

  test("Increases/decreases key by id", async () => {
    const entity = await EntityModel.findOneById(TestEntity._id, {
      code: true,
    });
    const key = "code";
    const count = 3;

    const increasedEntity = await EntityModel.increaseKeyById(
      entity._id,
      key,
      count
    );
    const decreasedEntity = await EntityModel.increaseKeyById(
      entity._id,
      key,
      -count
    );

    expect(increasedEntity[key]).toBe(entity[key] + count);
    expect(decreasedEntity[key]).toBe(entity[key]);
  });

  test("Updates one by id", async () => {
    const updateData = { firstName: "M" };

    await EntityModel.updateOneById(TestEntity._id, updateData);
    const updatedEntity = await EntityModel.findOneById(TestEntity._id);

    expect(updatedEntity.firstName).toBe(updateData.firstName);
  });

  test("Updates one by", async () => {
    const updateData = { firstName: "Mert", lastName: "Btmz" };

    await EntityModel.updateOneBy({ _id: TestEntity._id }, updateData);
    const updatedEntity = await EntityModel.findOneById(TestEntity._id);

    expect(updatedEntity.firstName).toBe(updateData.firstName);
    expect(updatedEntity.lastName).toBe(updateData.lastName);
  });

  test("Deletes one by id", async () => {
    await EntityModel.deleteOneById(TestEntity._id);

    const entity = await EntityModel.findOneById(TestEntity._id);

    expect(entity).toBe(null);
  });

  test("Deletes many by", async () => {
    const entityData = { firstName: "entity", lastName: "entity" };

    await Promise.all([
      EntityModel.create(entityData),
      EntityModel.create(entityData),
    ]);
    await EntityModel.deleteManyBy(entityData);
    const entities = await EntityModel.findManyBy({ entityData });

    expect(entities).toHaveLength(0);
  });
});
